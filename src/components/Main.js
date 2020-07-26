import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DisplayProject from "./displayProjects";
import Navbar from "./navbar";
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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <DisplayProject />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
