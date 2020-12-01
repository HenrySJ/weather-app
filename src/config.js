const secrets = require("./config/default.json");

const config = {
  apiKey: secrets.apiKey,
  ipToken: secrets.ipToken,
  geoToken: secrets.geoToken,
};

export default config;
