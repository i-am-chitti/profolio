import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
      color: "white",
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="userName" label="User name" variant="outlined" />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
          <Box ml={3}>
            <FormControlLabel
              value="top"
              control={<Checkbox color="primary" />}
              label="keep me logged in."
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "17%" }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
