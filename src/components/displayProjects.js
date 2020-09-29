import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { data } from ".././shared/data.js";
import Project from "./project";
import BackToTop from "./scrollTop";
import Toolbar from "@material-ui/core/Toolbar";

// import Slides from "./slides";

class DisplayProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedProject: null,
    };
  }

  render() {
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
