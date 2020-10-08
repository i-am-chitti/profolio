import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { data } from ".././shared/data.js";
import Project from "./project";
import BackToTop from "./scrollTop";
import Toolbar from "@material-ui/core/Toolbar";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../util/firebaseConnectivity";
import "firebase/database";

// import Slides from "./slides";

class DisplayProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedProject: null,
    };

    this.projectData=null;

    this.getProjectData(function(projectData) {
      console.log(projectData); //working
      //how to access this.projectData here
    })

    console.log(this.projectData); //still null

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
            {data.map((project) => (
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
