import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              MERN SKELETON
            </Link>
          </Typography>

          <Button>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/users"
            >
              users
            </Link>
          </Button>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signup"
            >
              SIGN UP
            </Link>
          </Button>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signin"
            >
              SIGN IN
            </Link>
          </Button>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/profile"
            >
              PROFILE
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
