const hostApi = "http://localhost";
//const hostApi = "http://159.93.221.48/";
const portApi = 3000;
//const portApi = 80;
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = "http://localhost:3000";
//const redirectUrl = "http://159.93.221.48/eqvium/";

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
