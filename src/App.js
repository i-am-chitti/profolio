import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
