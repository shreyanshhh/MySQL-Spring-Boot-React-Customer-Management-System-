import React , { Component } from "react";
import useEffect from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },	
  avatar: {										//changes the color of coordinates of "ICON"
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.info.main
    backgroundColor: '#f44336'
  },
  form: {									//changes distance between heading and the girds 
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {     
  	marginTop: theme.spacing(5),                         //changes save button coordinates
    //margin: theme.spacing(3,0, 2)
  },
  textField: {							//changes "DOB" grid coordinates 
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
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
            openPopup: props.openPopup,
            setOpenPopup: props.setOpenPopup

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalesHandler = this.changeSalesHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.updateCust = this.updateCust.bind(this);
    		this.upDateData= '';
    		this.setCustomer= '';
        this.handleClosePopup = this.handleClosePopup.bind(this);
	}

	

	componentDidMount(){
        axios.get("/api/customer/" + this.state.id).then( (res) =>{
            let customer = res.data;
            this.setState({name: customer.name,
                sales: customer.sales,
                gender : customer.gender,
                selectedDate: customer.dob
            });
        });

    }

    updateCust = (e) => {
        e.preventDefault();
        let customer = {name: this.state.name, gender: this.state.gender, sales: this.state.sales, dob: this.state.selectedDate};

        if(this.state.id == null){
              axios.post('api/customer', customer).then(response =>{
              if(response.data != null){
                //alert("Data successfully updated!");
                this.setState({setCustomer: axios.get('api/customer').then((res) => this.setState({upDateData: res.data}))});
                window.location.reload(false);
                }
              });
        }

        else{
            axios.put('/api/customer/' +this.state.id, customer).
             then(response =>{
              if(response.data != null){
                //alert("Data successfully updated!");
                this.setState({setCustomer: axios.get('api/customer').then((res) => this.setState({upDateData: res.data}))});
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
      this.state.setOpenPopup(false);
    }

  
  render(){
  return (
   				
       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h4">
          Customer Details
        </Typography>
        <form className={useStyles.form} noValidate>
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
          
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={useStyles.submit}
            onClick={this.updateCust}
          >
            Save
          </Button>

          <Button variant="contained" color="secondary" fullWidth onClick={this.handleClosePopup}>
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
