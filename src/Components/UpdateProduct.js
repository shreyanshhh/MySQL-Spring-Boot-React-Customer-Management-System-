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

class UpdateProduct extends Component {
	constructor(props){
		super(props)

        this.state = {
            id: props.recordForEdit,
            name: '',
            cost: '',
            category: '',
            size:'',
            color: '',
            product: '',
            openProductDialog: props.openProductDialog,
            setOpenProductDialog: props.setOpenProductDialog

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changeColorHandler = this.changeColorHandler.bind(this);
        this.addUpdateProduct = this.addUpdateProduct.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
	}

	componentDidMount(){
        if(this.state.id == null){
          return 
        }
        else{
              axios.get("/api/products/" + this.state.id).then( (res) =>{
              let product = res.data;
              this.setState({name: product.name,
                  cost: product.costPerUnit,
                  category : product.category,
                  size: product.size,
                  color: product.color
              });
          });
        }
    }

    
    
    addUpdateProduct = (e) => {      //Checks the value of id and either adds/updates customer records        
        e.preventDefault();
        let product = {name: this.state.name, costPerUnit: this.state.cost, category: this.state.category, size: this.state.size, color: this.state.color};

        if(this.state.id == null){
              axios.post('api/products', product).then(response =>{
              if(response.data != null){
                window.location.reload(false);
                }
              });
        }

        else{
            axios.put('/api/products/' +this.state.id, product).
             then(response =>{
              if(response.data != null){
                window.location.reload(false);
                }
              });
        } 
    }


	changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeCostHandler= (event) => {
        this.setState({cost: event.target.value});
    }

    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }

    changeSizeHandler= (event) => {
        this.setState({size: event.target.value});
    }

    changeColorHandler= (event) => {
        this.setState({color: event.target.value});
    }

    handleClosePopup = (event) =>{
      this.state.setOpenProductDialog(false);
    }

  
  render(){
  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h3" >
          Product Details
        </Typography>
        <form className={useStyles.form} noValidate style={{ margin: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                value={this.state.name}
                label="Name"
                name="name"
                autoComplete="name"
                onChange={this.changeNameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cost"
                name="costPerUnit"
                variant="outlined"
                required
                fullWidth
                value={this.state.cost}
                id="cost"
                label="cost"
                onChange={this.changeCostHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                value={this.state.category}
                label="Category"
                name="category"
                autoComplete="category"
                onChange={this.changeCategoryHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              	fullWidth
              	value={this.state.size}
              	variant="outlined"
                id="size"
                label="Size"
                name="size"
                name="size"
                autoComplete="size"
                onChange={this.changeSizeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={this.state.color}
                variant="outlined"
                id="color"
                label="Color"
                name="color"
                name="color"
                autoComplete="color"
                onChange={this.changeColorHandler}
              />
            </Grid>
          </Grid>
          
          <Button variant="contained" color="primary" preventDefault className={useStyles.submit} onClick={this.addUpdateProduct}
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

export default UpdateProduct;
