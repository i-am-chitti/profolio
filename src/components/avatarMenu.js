import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { user } from "../shared/user";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: "10px",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function AvatarMenu(params) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Typography className={classes.title} variant="h6" noWrap>
        {user.name}
      </Typography>
    </>
  );
}
