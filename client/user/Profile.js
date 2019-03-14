import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";

import DeleteUser from "./DeleteUser";
import { isAuthenticated } from "../auth/auth-helper";
import { read } from "./api-user";

const styles = theme => {
  return {
    card: {
      maxWidth: 600,
      margin: "auto",
      textAlign: "center",
      marginTop: `${theme.spacing.unit * 5}px`,
      paddingBottom: `${theme.spacing.unit * 2}px`
    }
  };
};

class Profile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
    this.match = match;
  }

  init = userId => {
    const jwt = isAuthenticated();
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

  render() {
    const { classes } = this.props;
    const { redirectToSignin } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div>
        <Paper className={classes.card} elevation={1}>
          <Typography variant="h5" component="h3">
            Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={this.state.user.name}
                secondary={this.state.user.email}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  "Joined: " + new Date(this.state.user.created).toDateString()
                }
              />
            </ListItem>
            {isAuthenticated().user &&
              isAuthenticated().user._id == this.state.user._id && (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + this.state.user._id}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={this.state.user._id} />
                </ListItemSecondaryAction>
              )}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
