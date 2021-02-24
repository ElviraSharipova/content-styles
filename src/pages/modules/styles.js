import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  paper: {
    margin: "24px 0",
    backgroundColor: "#f3f3f3",
  },
  virtualEnv: {
    marginBottom: 64
  },
  navCollapse: {
    position: "fixed",
    top: 150,
    left: 0,
    height: "3vh",
    background: "#343B4D",
    overflow: "auto",
    fontSamily: "sans-serif",
    width: 260,
    whiteSpace: "normal",
    margin: 0,
    display: "flex",
    color: "#B4B8CC",
    textDecoration: "none",
    transition: "background 0.3s ease-in",
    listStyleType: "none",
    fontSize: "13px",
    lineHeight: "120%",
    fontStyle: "normal",
    fontWeight: "normal",
  }
}));
