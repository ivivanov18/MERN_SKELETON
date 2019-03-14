import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./api-user";

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  };

  clickButton = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  deleteAccount = () => {
    const jwt = isAuthenticated();
    remove({ userId: this.props.userId }, { t: jwt.token }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        auth.signOut(() => console.log("deleted"));
        this.setState({ redirect: true });
      }
    });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <span>
        <IconButton
          aria-label="Delete"
          onClick={this.clickButton}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.deleteAccount}
              color="secondary"
              autoFocus="autoFocus"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};
export default DeleteUser;
