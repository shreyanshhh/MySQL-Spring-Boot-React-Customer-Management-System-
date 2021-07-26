import React , { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },  
  avatar: {                   //changes the color of coordinates of "ICON"
    margin: theme.spacing(5),
    backgroundColor: '#f44336'
  },
  form: {                           //changes distance between heading and the girds 
    width: "100%",                    // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {                              //changes save button coordinates
    margin: theme.spacing(3,0, 2),
    position: 'absolute',
     bottom:' 80px',
     left: '60px',
     
  },
  textField: {                            //changes "DOB" grid coordinates 
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: "100%"
  },

  cancelbutton: {                              //changes save button coordinates
    margin: theme.spacing(3,0, 2),
    position: 'absolute',
     bottom:' 80px',
     left: '350px',
     
  },
}));

class UpdateOrder extends Component {
  constructor(props){
    super(props)

        this.state = {
            id: props.recordForEdit,
            productName: '',
            customerName: '',
            quantity: '',
            amount:'',
            openOrderDialog: props.openOrderDialog,
            setOpenOrderDialog: props.setOpenOrderDialog

        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeCustomerNameHandler = this.changeCustomerNameHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.addUpdateOrder = this.addUpdateOrder.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  componentDidMount(){
        if(this.state.id == null){
          return 
        }
        else{
              axios.get("/api/orders/" + this.state.id).then( (res) =>{
              let order = res.data;
              this.setState({productName: order.productName,
                  customerName: order.customerName,
                  quantity : order.quantity,
                  amount: order.amount
              });
          });
        }
    }

    
    
    addUpdateOrder = (e) => {      //Checks the value of id and either adds/updates customer records        
        e.preventDefault();
        let product = {productName: this.state.productName, customerName: this.state.customerName, quantity: this.state.quantity, amount: this.state.amount};

        if(this.state.id == null){
              axios.post('api/orders', product).then(response =>{
              if(response.data != null){
                window.location.reload(false);
                }
              });
        }

        else{
            axios.put('/api/orders/' +this.state.id, product).
             then(response =>{
              if(response.data != null){
                window.location.reload(false);
                }
              });
        } 
    }


   changeProductNameHandler= (event) => {
        this.setState({productName: event.target.value});
    }

    changeCustomerNameHandler= (event) => {
        this.setState({customerName: event.target.value});
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    changeAmountHandler= (event) => {
        this.setState({amount: event.target.value});
    }

    handleClosePopup = (event) =>{
      this.state.setOpenOrderDialog(false);
    }

  
  render(){
  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h3" >
          Order Details
        </Typography>
        <form className={useStyles.form} noValidate style={{ margin: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="productName"
                name="Product Name"
                variant="outlined"
                required
                fullWidth
                value={this.state.productName}
                id="productName"
                label="Product Name"
                onChange={this.changeProductNameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="customerName"
                name="Customer Name"
                variant="outlined"
                required
                fullWidth
                value={this.state.customerName}
                id="customerName"
                label="Customer Name"
                onChange={this.changeCustomerNameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                value={this.state.quantity}
                label="Quantity"
                name="quantity"
                autoComplete="quantity"
                onChange={this.changeQuantityHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={this.state.amount}
                variant="outlined"
                id="amount"
                label="Amount"
                name="amount"
                name="amount"
                required
                autoComplete="amount"
                onChange={this.changeAmountHandler}
              />
            </Grid>
          </Grid>
          
          <Button variant="contained" color="primary" preventDefault className={useStyles.submit} onClick={this.addUpdateOrder}
            style={{ margin: 10, marginLeft: 0 }}
          >
            Save
          </Button>

          <Button variant="contained" color="secondary" preventDefault style={{ marginLeft: 185}} className={useStyles.cancelbutton} onClick={this.handleClosePopup}>
            Cancel
          </Button>
          
          <Grid container justify="center">
          </Grid>
        </form>
      
      </div>
    </Container>
  );

}
}

export default UpdateOrder;
