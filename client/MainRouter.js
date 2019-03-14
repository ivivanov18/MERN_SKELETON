import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Navbar from "./Navbar";

class MainRouter extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
        </Switch>
      </div>
    );
  }
}
export default MainRouter;
