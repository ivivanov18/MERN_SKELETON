import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";

class MainRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/users/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
        </Switch>
      </div>
    );
  }
}
export default MainRouter;
