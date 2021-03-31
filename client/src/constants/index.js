//TODO: Break up large constants file into smaller constants file

const PUBLIC_URL = process.env.PUBLIC_URL;
const PHOTO_NAMES = {
  cloud: `${PUBLIC_URL}/img/icons/cloud.png`,
  earth: `${PUBLIC_URL}/img/icons/earth.png`,
  heart: `${PUBLIC_URL}/img/icons/heart.png`,
};

// Router's base (i.e. anything after the domain)
const ROUTER_BASE_NAME = "/";

// Various Server URLs
var SERVER_URL = "http://localhost:8081";
if (process && process.env) {
  if (process.env.REACT_APP_SERVER_TYPE === "staging") {
    SERVER_URL = "https://backend-staging.herokuapp.com";
  }
  if (process.env.REACT_APP_SERVER_TYPE === "prod") {
    SERVER_URL = "https://backend-prod.herokuapp.com";
  }
}

// Editor and Output constants
//View Mode
const CODE_AND_OUTPUT = 0;
const CODE_ONLY = 1;
const OUTPUT_ONLY = 2;

//UI

module.exports = {
  // photo names
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME: "icecream",

  // Router Base Name
  ROUTER_BASE_NAME,

  //Server Host Name
  SERVER_URL,

  //User value constants
  MINIMUM_USERNAME_LENGTH: 6,
  MINIMUM_PASSWORD_LENGTH: 6,
  MINIMUM_DISPLAY_NAME_LENGTH: 1,
  MAXIMUM_USERNAME_LENGTH: 32,
  MAXIMUM_PASSWORD_LENGTH: 128,
  MAXIMUM_DISPLAY_NAME_LENGTH: 25,

  // UI constants
  RING_LOADER_SIZE: 50,
  OPEN_PANEL_LEFT: 0,

  // editor constants:
  CODE_AND_OUTPUT,
  CODE_ONLY,
  OUTPUT_ONLY,

  // UI

  //Firebase constants
  EMAIL_DOMAIN_NAME: "@fake.com",
};