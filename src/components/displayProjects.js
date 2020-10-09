import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { data } from ".././shared/data.js";
import Project from "./project";
import BackToTop from "./scrollTop";
import Toolbar from "@material-ui/core/Toolbar";
import CircularIndeterminate from './circularProgress';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../util/firebaseConnectivity";
import "firebase/database";

class DisplayProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedProject: null,
      projectData: null
    };
  }

  componentDidMount() {
    this.getProjectData((datas) => this.changeState(datas));
  }

  changeState(datas) {
    console.log(datas);
    var projectDatas=Object.values(datas);
    projectDatas.map(oneData => {
      oneData.images = Object.values(oneData.images);
    });
    this.setState({projectData: projectDatas});
  }

  getProjectData = (callback) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        //logged in
        firebase.database().ref('users/'+user.uid+'/projects').on("value", function(snapshot) { //get json object from DB
          callback(snapshot.val());
        },
        function(error) {
          console.log(error.code);
        })
      }
    })
  }

  render() {

    //request data from dB and wait till finished fetching or no render until complete data is fetched.

    if(!this.state.projectData) {
      return <CircularIndeterminate />;
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Toolbar id="back-to-top-anchor" style={{ minHeight: "30px" }} />
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            {this.state.projectData.map((project) => (
              <Grid key={project.id} item>
                <Project project={project} />
                {/* <Slides project={selectedProject} /> */}
              </Grid>
            ))}
          </Grid>
          <BackToTop />
        </Grid>
      </Grid>
    );
  }
}

export default DisplayProjects;
