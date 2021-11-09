import React from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Close as CloseIcon } from "@mui/icons-material";
import useStyles from './styles';
// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import Confirm from "../pages/confirm";
import Verify from "../pages/verify";
import Reset from "../pages/reset";
import Landing from "../pages/landing";
import Registration from "../pages/registration";
import Admin from "../pages/admin";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  const isAuth = isAuthenticated()
  const classes = useStyles();
  function CloseButton({ closeToast, className }) {
    return <CloseIcon className={className} onClick={closeToast} />;
  }

  return (
    <>
    <ToastContainer
      className={classes.toastsContainer}
      closeButton={
        <CloseButton className={classes.notificationCloseButton} />
      }
      closeOnClick={false}
      progressClassName={classes.notificationProgress}
    />
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/cabinet" />}
          />
          {/*<PrivateRoute path="/app" component={Layout} />*/}
          <Route path="/app" component={Layout} />
          <Route path="/" exact component={Landing} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Registration} />
          <PublicRoute path="/confirm" component={Confirm} />
          <PublicRoute path="/verify-email" exact component={Verify} />
          <PublicRoute path="/password-reset" exact component={Reset} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    </>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            isAuth ? (
            React.createElement(component, props)
          ) : (
            <Redirect to={"/login"} />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            isAuth ? (
            <Redirect
              to={{
                pathname: "/app/catalog"
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
