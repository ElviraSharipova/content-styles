import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  Link,
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
import { useUserDispatch, loginUser, registerUser } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

import axios from "axios";
import Cookies from 'js-cookie';

const getGreeting = () => {
    return "Авторизация в Eqvium";
};

function Login(props) {
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
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);
  var [forgotKey, setForgotKey] = useState("");
  var [forgotHash, setForgotHash] = useState("");

  function sendPasswordResetEmail() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.post("/forgot/email/", { "email": forgotEmail }).then(res => {
        setForgotHash(res.data.key)
      })
    })
  }

  function setNewPassword() {
    axios.post("/forgot/", {
      "key": forgotKey,
      "password": passwordValue,
      "hash": forgotHash,
      "email": forgotEmail
    }).then(() => {
      setForgotHash("")
      history.push("/");
    })
  }

  return (
    <Grid container className={classes.container}>
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          {isForgot ? (
            !forgotHash ? (
              <div>
              <Input
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.InputUnderline,
                      input: classes.Input
                    }
                  }}
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  margin="normal"
                  placeholder="Email"
                  type="Email"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (
                    <Button
                      disabled={
                        forgotEmail.length === 0
                      }
                      onClick={sendPasswordResetEmail}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Отправить
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    onClick={() => setIsForgot(!isForgot)}
                    className={classes.forgetButton}
                  >
                    Вернуться ко входу
                  </Button>
                </div>
              </div>
            ) : (
              <div>
              <Input
                id="key"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={forgotKey}
                onChange={e => setForgotKey(e.target.value)}
                margin="normal"
                placeholder="Ключ"
                type="password"
                fullWidth
              />
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Пароль"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (
                    <Button
                      disabled={
                        forgotEmail.length === 0
                      }
                      onClick={setNewPassword}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Отправить
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    onClick={() => setIsForgot(!isForgot)}
                    className={classes.forgetButton}
                  >
                    Вернуться ко входу
                  </Button>
                </div>
              </div>
            )
          ) : (
          <>
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                {getGreeting()}
              </Typography>
              <Button
                size="large"
                className={classes.googleButton}
                onClick={() =>
                  loginUser(
                    userDispatch,
                    loginValue,
                    passwordValue,
                    props.history,
                    setIsLoading,
                    setError,
                    "google"
                  )
                }
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Войти с Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>или</Typography>
                <div className={classes.formDivider} />
              </div>
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
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Пароль"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Войти
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => setIsForgot(!isForgot)}
                  className={classes.forgetButton}
                >
                  Забыли пароль?
                </Button>
              </div>
            </React.Fragment>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              href="/#/register"
                  style={{ marginTop: 24 }}
            >
              Зарегистрироваться
            </Button>
          </>
        )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
