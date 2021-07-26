import React, { Component } from "react";
import {BrowserRouter as Router } from "react-router-dom";
import InstructorApp from "./Components/InstructorApp";

class App extends Component {
  render() {
    return (
      <Router>
      	<InstructorApp />
      </Router>
      
    );
  }
}

export default App;



