import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Blog from "./pages/Blog";
import Albums from "./pages/Albums";
import Post from "./pages/Post";
import { isAuthenticated } from "./services/auth";
import NavBar from './components/navbar'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <>
        
        <NavBar ></NavBar>
        <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/blog" component={Blog} />
      <Route path="*" component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;