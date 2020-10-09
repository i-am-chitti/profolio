import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { DropzoneArea } from "material-ui-dropzone";
import IconButton from "@material-ui/core/IconButton";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "../util/firebaseConnectivity";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
      color: "white",
    },
  },
}));

export default function FormDialog() {

  const [open, setOpen] = React.useState(false);

  var currentUser;

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log(user.email+" is logged in");
      currentUser=user;
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    title: "",
    sourceLink: "",
    liveLink: "",
    description: "",
    pics: []
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
    console.log(prop);
  };

  const handleDropBoxChange = (file) => {
    values.pics = file;
  };

  const handleSubmit = () => {
    if(currentUser) console.log(currentUser.uid);
    if(!values.pics.length) alert("Add at least one pic");
    else {
      
      var postData = {
        name: values.title,
        link: values.sourceLink,
        live: values.liveLink,
        description: values.description
      };
      //push static data into dB
      var projectKey = firebase.database().ref('users/'+currentUser.uid+'/projects').push().key;
      postData.id = projectKey;
      projectKey = firebase.database().ref('users/'+currentUser.uid+'/projects').push(postData).key;

      values.pics.forEach((pic) => {
        //upload images to firebase storage
        var uploadTask = firebase.storage().ref('images/'+currentUser.uid+'/'+pic.name).put(pic);
        uploadTask.on('state_changed', function(snapshot) {
          //function to track images upload
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //progress scale for a progress bar
        },
        function(error) {
          //if any error occured, display
          alert(error.code);
        },
        function() {
          console.log("getting download link");
          //getting download link
          uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
            firebase.database().ref('users/'+currentUser.uid+'/projects/'+projectKey+'/images').push(url);
          });
        });
      });
      
    }
  }

  return (
    <div>
      <IconButton aria-label="search" color="inherit" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            onChange={handleChange("title")}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="source_link"
            label="Source Code Link"
            onChange={handleChange("sourceLink")}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="live_link"
            label="Live Project Link"
            type="text"
            onChange={handleChange("liveLink")}
            fullWidth
          />
          <TextField
            id="description"
            label="Description"
            placeholder="Placeholder"
            onChange={handleChange("description")}
            fullWidth
            multiline
            style={{ marginBottom: "15px" }}
          />
          <DropzoneArea
           acceptedFiles={['image/*']}
           id="projectScreenshots"
           onChange={(file) => handleDropBoxChange(file)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
