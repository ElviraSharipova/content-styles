import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  TextField as Input
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";
import Header from "../../components/Header/HeaderLanding";

import axios from "axios";
import Cookies from 'js-cookie';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const getGreeting = () => {
    return "Регистрация";
};

function Registration(props) {
  var classes = useStyles();
  const history = useHistory();

  // global
  var userDispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get("token");
    if (token) {
      receiveToken(token, userDispatch);
      doInit()(userDispatch);
    }
  }, []); // eslint-disable-line
  

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);
  var [helperText, setHelperText] = useState("");

  function registerUser(
    dispatch,
    name,
    email,
    password,
    confirmPassword,
    history,
    setIsLoading,
    setError
  ) {
    if (password != confirmPassword) return () => { setHelperText("Пароли не совпадают") }
      return () => {
        if (email.length > 0) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("name", name);
          axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
          axios.post("/register/email/", { email: email }).then(res => {
            localStorage.setItem("verification_key", res.data.key);
            dispatch({
              type: 'REGISTER_SUCCESS'
            });
            history.push('/confirm');
          }).catch(err => {
            if (err.response.status == 302) {
              setHelperText("Такая почта уже зарегистрирована")
            }
          });
        }
      };
    }

  return (
    <Grid container className={classes.container}>
      <Header />
      <div className={classes.fakeToolbar} />
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
            <>
            <React.Fragment>
              {config.isBackend ? (
                <Widget
                  disableWidgetMenu
                  inheritHeight
                  style={{ marginTop: 32 }}
                >
                  <Typography
                    variant={"body2"}
                    block
                    style={{ textAlign: "center" }}
                  >
                    This is a real app with Node.js backend - use
                    <Typography variant={"body2"} weight={"bold"}>
                      "admin@flatlogic.com / password"
                    </Typography>{" "}
                    to login!
                  </Typography>
                </Widget>
              ) : null}
              <Typography variant="h2" className={classes.greeting}>
                {getGreeting()}
              </Typography>
              <Fade
                in={error}
                style={
                  !error ? { display: "none" } : { display: "inline-block" }
                }
              >
                <Typography color="secondary" className={classes.errorMessage}>
                  Пароль или логин неверны :(
                </Typography>
              </Fade>
              <Input
                id="email"
                //InputProps={{
                //  classes: {
                //    underline: classes.InputUnderline,
                //    input: classes.Input
                //  }
                //}}
                variant="outlined"
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="email"
                fullWidth
                helperText="На указанный e-mail будет отправлен ключ подтверждения"
              />
              <Input
                id="name"
                //InputProps={{
                //  classes: {
                //    underline: classes.InputUnderline,
                //    input: classes.Input
                //  }
                //}}
                variant="outlined"
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Имя"
                type="name"
                fullWidth
              />
              <Input
                id="password"
                //InputProps={{
                //  classes: {
                //    underline: classes.InputUnderline,
                //    input: classes.Input
                //  }
                //}}
                variant="outlined"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Пароль"
                type="password"
                fullWidth
              />
              <Input
                id="password"
                //InputProps={{
                //  classes: {
                //    underline: classes.InputUnderline,
                //    input: classes.Input
                //  }
                //}}
                variant="outlined"
                value={passwordConfirmValue}
                onChange={e => setPasswordConfirmValue(e.target.value)}
                margin="normal"
                placeholder="Повторите пароль"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                <Button
                  onClick={() => { history.push('/login') }}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Назад
                </Button>
                <Typography className={classes.greeting}>
                  {helperText}
                </Typography>
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0 || nameValue.length === 0
                  }

                  onClick={() => {
                    registerUser(
                      userDispatch,
                      nameValue,
                      loginValue,
                      passwordValue,
                      passwordConfirmValue,
                      props.history,
                      setIsLoading,
                      setError
                    )()
                  }
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Далее
                </Button>
              </div>
            </React.Fragment>
          </>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Registration);
