import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link,
  Modal
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import classNames from "classnames";

//images
import profile from "../../images/main-profile.png";
import config from "../../config";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Avatar, Button } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "../../context/LayoutContext";
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext'

import { actions } from '../../context/ManagementContext'
import { useUserDispatch, signOut } from "../../context/UserContext";
import Logo from '../../images/logo-eqvium.png';

import axios from "axios";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const messages = [
];

const notifications = [
];

export default function Header(props) {
  var classes = useStyles();
  var theme = useTheme();
  const history = useHistory();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  const managementDispatch = useManagementDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [isSmall, setSmall] = useState(false);
  const [openContacts, setOpenContacts] = React.useState(false);

  const managementValue = useManagementState()
  const nickname = localStorage.getItem("nickname") || localStorage.getItem("email");
  const user_id = localStorage.getItem("user");

  useEffect(() => {
    actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch)
  }, [])

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;
    setSmall(isSmallScreen);
  }

  function handleRemoveAcc() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.delete("/profiles/" + user_id + "/").then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem('user_id');
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        axios.defaults.headers.common["Authorization"] = "";
        history.push('/');
      }).catch(err => console.error(err));
    });
  }

  const handleOpenContacts = () => {
    setOpenContacts(true);
  };

  const handleCloseContacts = () => {
    setOpenContacts(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <a href="/#/" style={{ marginRight: "10vw", flexGrow: 1 }}><img src={Logo} style={{ marginLeft: 24, height: 75 }} /></a>
        {/*<Button component={Link} href="/#/app/cabinet" color={"white"} style={{ marginRight: 12 }}>Личный кабинет</Button>*/}
        <Button component={Link} href="/#/app/catalog" color={"white"} style={{ marginRight: 12 }}>Каталог</Button>
        {/*<Button component={Link} href="/#/app/courses" color={"white"} style={{ marginRight: 12 }} disabled>Курсы и события</Button>*/}
        <Button component={Link} href="/#/app/commands" color={"white"} style={{ marginRight: 12 }} disabled>Мои команды</Button>
        <Button component={Link} href="/#/app/hardware" color={"white"} style={{ marginRight: 12 }} disabled>Оборудование</Button>
        <Button onClick={handleOpenContacts} color={"white"} style={{ marginRight: 12 }} >Контакты</Button>
        {user_id == 1 &&
          <Button component={Link} href="/#/admin" color={"white"}>Администрирование</Button>
        }
        <div className={classes.grow} />
        <Modal
          open={openContacts}
          onClose={handleCloseContacts}
        >
          <div className={classes.modal}><p>Если у вас возникли вопросы обращайтесь на почту:</p><p>Также пишите нам в Telegram:</p></div>
        </Modal>
        {/*<IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>*/}
        {user_id ? (
          <div style={{ display: "flex", justifyContent: "left", marginRight: 24 }}>
            <Button
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={e => setProfileMenu(e.currentTarget)}
            >
              <AccountCircleIcon color="primary" fontSize="large" />
              {/*<Typography variant="body2" weight={"bold"} color="primary" style={{ marginLeft: 12, marginRight: 12, marginTop: 12 }}>
                {nickname}
              </Typography>*/}
              <ArrowDropDownIcon color="primary" />
            </Button>
          </div>
        ) : (
          <div style={{ position: 'fixed', right: '1%' }}>
            <Button href="/#/app/catalog" variant="outlined" color="primary" size="large" style={{ marginRight: 10, width: 150, height: 40 }}><span style={{ marginLeft: 24, marginRight: 24 }}>Вход</span></Button>
            <Button href="/#/register" variant="contained" color="primary" size="large" style={{ width: 150, height: 40 }}><span>Регистрация</span></Button>
          </div>
        )}
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Новые сообщения
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              Новых сообщений: {messages.length}
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Отправить сообщение
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} />
            <Button component={Link} href="/#/app/profile" color={"white"} style={{marginRight: 24}}>
              Настройки
            </Button>
          </MenuItem>
          {user_id != 1 &&
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
            >
              <Button onClick={handleRemoveAcc} color={"white"} style={{ marginRight: 24 }}>
                Удалить аккаунт (DEBUG)
            </Button>
            </MenuItem>
          }
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Выход
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
