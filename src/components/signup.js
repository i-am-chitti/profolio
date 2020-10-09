import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../util/firebaseConnectivity";
import "firebase/database";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
      color: "white",
    },
  },
}));

export default function Login() {
  function writeUserData(user) {
    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        email: user.email,
      });
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      writeUserData(user);
      window.location = "/profile";
    } else {
      // No user is signed in.
    }
  });

  const classes = useStyles();
  const [values, setValues] = React.useState({
    userName: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const email = values.userName;
    const password = values.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="userName"
          onChange={handleChange("userName")}
          label="User name"
          variant="outlined"
        />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onChange={handleChange("showPassword")}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "17%" }}
          onClick={() => handleSubmit()}
        >
          Sign Up
        </Button>
        <Box mt={1}>
          <Link to="/">Already have an Account</Link>
        </Box>
      </form>
    </Container>
  );
}
