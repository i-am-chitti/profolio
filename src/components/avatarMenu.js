import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { user } from "../shared/user";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../util/firebaseConnectivity";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "10px",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function AvatarMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    firebase.auth().signOut().then(function() {
      window.location = "/login";
    }).catch(function(error) {
      alert("error in logging out");
    });
  };

  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src={user.picture}
        style={{ margin: "10px", cursor: "pointer" }}
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Share Profile</MenuItem>
        <Link to="profile" className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            My account
          </MenuItem>
        </Link>
        <Link to="/" className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            Projects
          </MenuItem>
        </Link>
          <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
      </Menu>
      <Typography className={classes.title} variant="h6" noWrap>
        {user.name}
      </Typography>
    </>
  );
}
