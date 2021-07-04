import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

class App extends Component {
  render() {
    return (
      <Router>
      	<Sidebar/>
      </Router>
    );
  }
}

export default App;

