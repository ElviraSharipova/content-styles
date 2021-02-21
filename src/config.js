const hostApi = "http://localhost";
//const hostApi = "http://159.93.221.48/";
//const hostApi = "http://79.143.25.41";
//const hostApi = "http://5.188.114.32";
const portApi = 3000;
//const portApi = "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = "http://localhost:3000";
//const redirectUrl = "http://159.93.221.48/eqvium/";
//const redirectUrl = "http://79.143.25.41";
//const redirectUrl = "http://5.188.114.32";

export default {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: "http://eqviumjs.herokuapp.com",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: "admin@flatlogic.com",
    password: "password"
  }
};
