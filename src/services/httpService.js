const axios = require('axios')

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  url: `${process.env.REACT_APP_BACK_END}`,
}

export default http
