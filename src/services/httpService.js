const axios = require("axios");

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
};

export default http;
