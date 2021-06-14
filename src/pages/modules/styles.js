import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  paper: {
    margin: "24px 0",
    backgroundColor: "#f3f3f3",
  },
  virtualEnv: {
    marginBottom: 64
  },
  test: {
    marginLeft: "calc(10vw - 96px)",
    marginBottom: "3%"
  },
  testButtons: {
    marginTop: -12,
    marginBottom: 48,
  },
  codeEditor: {
    margin: 27
  },
  progressBar: {
    flexGrow: 1,
    marginRight: "12px",
    barColorPrimary: {
      backgroundColor: "#00C9FF"
    },
  },
  dataStreamButton: {
    margin: 24
  },
  checkmarkPrimary: {
    color: "#00C9FF",
    fontSize: 20,
    marginRight: 10
  },
  checkmarkSecondary: {
    color: "#00C9FF",
    fontSize: 16,
    marginRight: 10
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  contentDescription: {
    
  },
  contentText: {
    "& > *": {
      marginBottom: 12,
      fontFamily: "Roboto"
    },
    "& > ul": {
      listStyleType: "disc",
    },
  },
}));
