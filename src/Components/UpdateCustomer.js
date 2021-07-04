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

class UpdateCustomer extends Component {
	constructor(props){
		super(props)

        this.state = {
            id: props.recordForEdit,
            name: '',
            sales: '',
            gender: '',
            selectedDate:'',
            customer: '',
            openCustomerDialog: props.openCustomerDialog,
            setOpenCustomerDialog: props.setOpenCustomerDialog

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalesHandler = this.changeSalesHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.addUpdateCustomer = this.addUpdateCustomer.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
	}

	componentDidMount(){
        if(this.state.id == null){
          return 
        }
        else{
              axios.get("/api/customer/" + this.state.id).then( (res) =>{
              let customer = res.data;
              this.setState({name: customer.name,
                  sales: customer.sales,
                  gender : customer.gender,
                  selectedDate: customer.dob
              });
          });
        }
    }

    
    
    addUpdateCustomer = (e) => {      //Checks the value of id and either adds/updates customer records        
        e.preventDefault();
        let customer = {name: this.state.name, gender: this.state.gender, sales: this.state.sales, dob: this.state.selectedDate};

        if(this.state.id == null){
              axios.post('api/customer', customer).then(response =>{
              if(response.data != null){
                window.location.reload(false);
                }
              });
        }

        else{
            axios.put('/api/customer/' +this.state.id, customer).
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

    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }

    changeSalesHandler= (event) => {
        this.setState({sales: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({selectedDate: event.target.value});
    }

    handleClosePopup = (event) =>{
      this.state.setOpenCustomerDialog(false);
    }

  
  render(){
  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h3" >
          Customer Details
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
                autoComplete="sales"
                name="sales"
                variant="outlined"
                required
                fullWidth
                value={this.state.sales}
                id="sales"
                label="Sales"
                onChange={this.changeSalesHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gender"
                value={this.state.gender}
                label="Gender"
                name="gender"
                autoComplete="gender"
                onChange={this.changeGenderHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              	fullWidth
              	value={this.state.selectedDate}
              	variant="outlined"
                id="date"
                label="Date of birth"
                name="date of birth"
                type="date"
                className={useStyles.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.changeDateHandler}
              />
            </Grid>
          </Grid>
          
          <Button variant="contained" color="primary" preventDefault className={useStyles.submit} onClick={this.addUpdateCustomer}
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

export default UpdateCustomer;
