const secrets = require("./config/default.json");

const config = {
  apiKey: secrets.apiKey,
  ipToken: secrets.ipToken,
};

export default config;
