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
import { useUserDispatch, loginUser, responseGoogle } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

import axios from "axios";
import Cookies from 'js-cookie';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Header from "../../components/Header/HeaderLanding";
import { GoogleLogin } from 'react-google-login';

const getGreeting = () => {
  return "Авторизация";
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
  var [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);
  var [forgotKey, setForgotKey] = useState("");
  var [forgotHash, setForgotHash] = useState("");
  var [helperText, setHelperText] = useState("");

  function sendPasswordResetEmail() {
    axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
    setHelperText("Ключ подтверждения отправлен")
    axios.post("/forgot/email/", { "email": forgotEmail }).then(res => {
      setError(false)
      setForgotHash(res.data.key)
      setHelperText("")
    }).catch(err => {
      if (err.response.status == 404) {
        setHelperText("Пользователя с таким email не существует")
      }
    })
  }

  function setNewPassword() {
    if (passwordValue != passwordConfirmValue) {
      setHelperText("Пароли не совпадают")
      return
    }
    axios.post("/forgot/", {
      "key": forgotKey,
      "password": passwordValue,
      "hash": forgotHash,
      "email": forgotEmail
    }).then(() => {
      setForgotHash("")
      history.push("/");
    }).catch(err => {
      if (err.response.status == 400) {
        setHelperText("Неверный ключ")
      }
    })
  }

  const handleKeyDownReset = React.useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendPasswordResetEmail();
      }
    },
  );

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        loginUser(
          userDispatch,
          loginValue,
          passwordValue,
          props.history,
          setIsLoading,
          setError
        )
      }
    },
  );

  return (
    <Grid container className={classes.container}>
      <Header />
      <div className={classes.fakeToolbar} />
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          {isForgot ? (
            !forgotHash ? (
              <div>
                <Typography variant="h2" className={classes.greeting}>
                  Восстановление пароля
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center", marginTop: 40 }}>
                  Введите e-mail, на который был зарегистрирован Ваш аккаунт.
                  На указанный e-mail будет отправлен ключ для смены пароля
                </Typography>
                <Typography className={classes.errorMessage}>
                  {helperText}
                </Typography>
                <Input
                    id="email"
                    //InputProps={{
                    //  classes: {
                    //    underline: classes.InputUnderline,
                    //    input: classes.Input
                    //  }
                    //}}
                    variant="outlined"
                    value={forgotEmail}
                    onChange={e => { setForgotEmail(e.target.value); if (helperText) { setHelperText(""); } }}
                    margin="normal"
                    placeholder="Email"
                    type="email"
                    onKeyDown={handleKeyDownReset}
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
                      style={{ width: 150, height: 50 }}
                    >
                      Отправить
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    onClick={() => { setIsForgot(!isForgot); setError(false); setForgotHash("")}}
                    className={classes.forgetButton}
                  >
                    Вернуться ко входу
                  </Button>
                </div>
              </div>
            ) : (
              <div>
              <Typography variant="h2" className={classes.greeting}>
                Восстановление пароля
              </Typography>
              <Typography className={classes.errorMessage}>
                {helperText}
              </Typography>
              <Input
                id="key"
                //InputProps={{
                //  classes: {
                //    underline: classes.InputUnderline,
                //    input: classes.Input
                //  }
                //}}
                variant="outlined"
                value={forgotKey}
                onChange={e => setForgotKey(e.target.value)}
                margin="normal"
                placeholder="Ключ"
                type="key"
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
                      style={{ width: 250, height: 50 }}
                    >
                      Обновить пароль
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                      onClick={() => {setIsForgot(!isForgot); setError(false); setForgotHash("")}}
                    className={classes.forgetButton}
                  >
                    Вернуться ко входу
                  </Button>
                </div>
              </div>
            )
          ) : (
          <>
            <div>
              <Typography variant="h2" className={classes.greeting}>
                {/*<ArrowBackIosIcon onClick={() => { history.push('/') }} />*/}
                {getGreeting()}
              </Typography>
                  {/*<GoogleLogin
                clientId="108182595919-un4dd9i8uj6640al2jj9640fhegq8nk1.apps.googleusercontent.com"
                buttonText="Войти с Google"
                onSuccess={(response) => responseGoogle(
                  response,
                  userDispatch,
                  setIsLoading,
                  setError
                )}
                onFailure={(response) => responseGoogle(
                  response,
                  userDispatch,
                  setIsLoading,
                  setError
                )}
                cookiePolicy={'single_host_origin'}
                responseType="code"
                scope="email"
                render={renderProps => (
                  <Button
                    size="large"
                    className={classes.googleButton}
                    onClick={renderProps.onClick}
                  >
                    <img src={google} alt="google" className={classes.googleIcon} />
                    &nbsp;Войти с Google
                  </Button>
                )}
              />
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>или</Typography>
                <div className={classes.formDivider} />
              </div>*/}
              <Fade
                in={error}
                style={
                  !error ? { display: "none" } : { display: "inline-block" },
                  { textAlign: "center", }
                }
              >
                <Typography color="secondary" className={classes.errorMessage}>
                  Пароль или логин неверны
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
                onKeyDown={handleKeyDown}
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
                    style={{ width: 150, height: 50 }}
                  >
                    Войти
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => {setIsForgot(!isForgot); setError(false)}}
                  className={classes.forgetButton}
                >
                  Забыли пароль?
                </Button>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
