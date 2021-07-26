import React, { Component } from 'react'
import AuthenticationService from '../Components/AuthenticationService';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import companylogo from '../Components/companylogo.jpg'

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `10px`,
    height: "100%",
    width: "99%",
    marginTop: theme.spacing(5)
  },
  form: {                           //changes distance between heading and the girds 
    width: "100%",                    // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  loginbutton: {                              //changes save button coordinates
    margin: theme.spacing(3,0, 2),
    position: 'absolute',
     bottom:' 80px',
     left: '350px',
  },
}));



class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'Shreyansh',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/sidebar`)
		
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
      <img src={companylogo} width="150px" style={{marginLeft:"110px",marginTop:"120px"}} />
        <Typography component="h1" variant="h3" style={{marginLeft:"120px",marginTop:"20px"}}>
          Login
        </Typography>
        <form className={useStyles.form} noValidate style={{ margin: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="username">Username</label>
            <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
              type="text"
              name="username" value={this.state.username} onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="password">Password</label>
            <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
              type="password"
              name="password" value={this.state.password} onChange={this.handleChange}
              />
            </Grid>
            </Grid>
            <Button variant="contained" color="primary" preventDefault  style={{ marginTop: 15, marginLeft: 125}} className={useStyles.loginbutton} onClick={this.loginClicked}>
                Login
            </Button>
            </form>
            
          </div>
        </Container>
        )
    }
}

export default LoginComponent;