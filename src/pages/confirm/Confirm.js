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
import { useUserDispatch, loginUser, confirmUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";
import Header from "../../components/Header/HeaderLanding";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const getGreeting = () => {
    return "Авторизация в Syncwoia";
};

function Confirm(props) {
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
  var [helperText, setHelperText] = useState("");

  return (
    <Grid container className={classes.container}>
      <Header />
      <div className={classes.fakeToolbar} />
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          <Typography variant="h2" className={classes.greeting}>
            Введите 6-значный ключ
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
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Ключ"
            type="key"
            fullWidth
          />
          <div className={classes.creatingButtonContainer}>
            {isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <div className={classes.formButtons}>
                <Button
                  onClick={() => { history.push('/register') }}
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ width: 150, height: 50 }}
                >
                  Назад
                </Button>
                <Button
                  onClick={() =>
                    confirmUser(
                      userDispatch,
                      loginValue,
                      props.history,
                      setIsLoading,
                      setError,
                      setHelperText
                    )()
                  }
                  disabled={
                    loginValue.length === 0
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.createAccountButton}
                  style={{ width: 150, height: 50 }}
                >
                  Подтвердить
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Confirm);
