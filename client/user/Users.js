import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";

import { list } from "./api-user";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  }
});

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      loaded: false
    };
  }

  componentDidMount() {
    list().then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data, loaded: true });
      }
    });
  }

  render() {
    const { classes } = this.props;
    if (this.state.loaded == false) {
      return <CircularProgress />;
    } else {
      return (
        <div>
          <Paper className={classes.card} elevation={4}>
            <Typography component="h2" variant="display1" type="title">
              All Users
            </Typography>
            <List>
              {this.state.users.map(user => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Users);
