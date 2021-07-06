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
  testHeader: {
    padding: 36,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1280,
  },
  testCheckbox: {
    paddingBottom: 6,
    paddingTop: 6,
  },
  testCheckboxLabel: {
    lineHeight: 1.3
  },
  codeEditor: {
    margin: 27
  },
  progressBar: {
    flexGrow: 1,
    marginBottom: "6px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  barColorPromary: {
    backgroundColor: "#00C9FF"
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
    marginRight: 10,
    marginLeft: 18,
  },
  iconSecondary: {
    fontSize: 20,
    marginRight: 10
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
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
    //        TODO
    //"& a": {
    //  target: "_blank",
    //  rel: "noopener noreferrer",
    //},
  },
}));
