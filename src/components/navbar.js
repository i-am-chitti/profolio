import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import AddProject from "./addProject";
import Searchbar from "./searchBar";
import AvatarMenu from "./avatarMenu";

// import MenuIcon from "@material-ui/icons/Menu";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

export default function Navbar({loggedIn , profile , projects}) {
  // const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <AvatarMenu />
        <AddProject />
        <Searchbar />
      </Toolbar>
    </AppBar>
  );
}
