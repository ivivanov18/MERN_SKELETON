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
import DialogSignin from "./DialogSignin";

import { create } from "./api-user";

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
  },
  media: {
    minHeight: 330
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      open: false,
      error: ""
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clickSubmit = () => {
    const { name, email, password } = this.state;

    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined
    };

    create(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, open: true });
      } else {
        this.setState({ error: "", open: true });
      }
    });
  };

  clickSignin = () => {
    this.setState({ open: false });
    this.props.history.push("/signin");
  };

  render() {
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardContent className={classes.container}>
            <Typography type="headline" component="h2">
              Sign up
            </Typography>
            <TextField
              name="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
            />
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
        <DialogSignin
          open={this.state.open}
          onClickSigninButton={this.clickSignin}
        />
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Signup);
