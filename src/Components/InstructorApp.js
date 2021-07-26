import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from '../Components/LoginComponent';
import AuthenticatedRoute from '../Components/AuthenticatedRoute';
import Sidebar from '../Components/Sidebar';

class InstructorApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" exact component={LoginComponent} />
                            <AuthenticatedRoute path="/sidebar" exact component={Sidebar} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp;