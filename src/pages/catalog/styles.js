import { makeStyles } from "@material-ui/styles";
import tinycolor from "tinycolor2";

export default makeStyles(theme => ({
  contentText: {
    "& > *": {
      marginBottom: 12,
      fontFamily: "Roboto"
    },
    "& p": {
      marginBottom: 6,
      marginTop: 6,
    },
    "& > p": {
      marginBottom: 18,
      marginTop: 18,
    },
    "& ul": {
      listStyleType: "disc",
      marginLeft: 24,
      marginTop: 6,
      marginBottom: 18,
    },
    "& ol": {
      listStyleType: "decimal",
      marginLeft: 24,
      marginTop: 6,
      marginBottom: 18,
    },
    "& li": {
      marginBottom: 6,
    },
    "& h2": {
      marginTop: 48,
    },
  },
  form: {
    flexGrow: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  card: {
    width: "100%",
    height: "100%"
  },
  cardLink: {
      color: "blue",
      opacity: 1.0,
    ":disabled": {
        color: "grey"
      }
  },
  cardLinkDisabled: {
    color: "grey",
    opacity: 0.3
  },
  media: {
    height: 320,
    padding: theme.spacing(2)
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  denseSelect: {
    "& .MuiOutlinedInput-input": {
      padding: 17
    }
  },
  // toast classes
  layoutContainer: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    position: "relative"
  },
  layoutText: {
    color: tinycolor(theme.palette.background.light)
      .darken()
      .toHexString()
  },
  layoutButtonsRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  layoutButton: {
    backgroundColor: theme.palette.background.light,
    width: 125,
    height: 50,
    outline: "none",
    border: "none"
  },
  layoutButtonActive: {
    backgroundColor: tinycolor(theme.palette.background.light)
      .darken()
      .toHexString()
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: theme.spacing(2)
  },
  notificationCallButton: {
    color: "white",
    marginBottom: theme.spacing(1),
    textTransform: "none"
  },
  codeContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2)
  },
  codeComponent: {
    flexGrow: 1
  },
  notificationItem: {
    marginTop: theme.spacing(2)
  },
  notificationCloseButton: {
    position: "absolute",
    right: theme.spacing(2)
  },
  toastsContainer: {
    width: "auto",
    marginTop: theme.spacing(6),
    right: 0
  },
  progress: {
    visibility: "hidden"
  },
  notification: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    boxShadow: "none",
    overflow: "visible"
  },
  searchIcon: {
    color: "rgba(0, 0, 0, 0.23)"
  }
}));
