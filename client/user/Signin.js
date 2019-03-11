import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { signin } from "./auth-user";
import { authenticate } from "../auth/auth-helper";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px
    ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
    //width: 200
  }
});

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  clickSubmit = () => {
    const { email, password } = this.state;

    const user = {
      email: email || undefined,
      password: password || undefined
    };

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };
  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    };

    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardContent className={classes.container}>
            <Typography type="headline" component="h2">
              Sign up
            </Typography>

            <TextField
              name="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              margin="normal"
            />
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                color="primary"
                raised="raised"
                onClick={this.clickSubmit}
                className={classes.submit}
              >
                Submit
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Signin);
