const secrets = require("./config/default.json");

const config = {
  ipToken: secrets.ipToken,
  geoToken: secrets.geoToken,
};

export default config;
