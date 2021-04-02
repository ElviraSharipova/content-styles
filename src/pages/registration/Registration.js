import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  TextField as Input
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, registerUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

const getGreeting = () => {
    return "Авторизация в Eqvium";
};

function Registration(props) {
  var classes = useStyles();

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

  return (
    <Grid container className={classes.container}>
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          <Typography variant="h2" className={classes.subGreeting}>
            Введите e-mail для отправки кода подтверждения
          </Typography>
          <Fade in={error}>
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
          <div className={classes.creatingButtonContainer}>
            {isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                onClick={() =>
                  registerUser(
                    userDispatch,
                    loginValue,
                    props.history,
                    setIsLoading,
                    setError
                  )()
                }
                disabled={
                  loginValue.length === 0
                }
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
              >
                Отправить подтверждение
              </Button>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Registration);
