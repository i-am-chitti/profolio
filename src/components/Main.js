import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayProject from "./displayProjects";
import Navbar from "./navbar";
import Login from "./login";
import SignUp from "./signup";

import Profile from "./userProfile";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/:username/projects" component={DisplayProject} />
          <Route path="/:username" component={Profile} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default Main;
