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

const styles = theme => {
  return {
    card: {
      maxWidth: 600,
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    }
  };
};

class EditProfile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
    this.match = match;
  }

  init = userId => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) this.setState({ redirectToSignin: true });
      else this.setState({ user: data });
    });
  };

  componentDidMount = () => {
    this.init(this.match.params.userId);
  };

  componentWillReceiveProps = props => {
    this.init(props.match.params.userId);
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    update(
      {
        userId: this.match.params.userId
      },
      {
        t: jwt.token
      },
      user
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ userId: data._id, redirectToProfile: true });
      }
    });
  };

  render() {
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
    </form>;
  }
}

export default EditProfile;
