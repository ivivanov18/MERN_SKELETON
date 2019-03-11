import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const DialogSignin = ({ open, onClickSigninButton }) => (
  <Dialog open={open} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">{"New Account"}</DialogTitle>
    <DialogContent>
      <DialogContentText>New Account Successfully created</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        autoFocus="autoFocus"
        color="primary"
        onClick={() => onClickSigninButton()}
      >
        Sign In
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogSignin;
