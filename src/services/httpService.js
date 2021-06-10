const axios = require('axios')

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  url: 'https://weather-app-caching.herokuapp.com/api/weather?',
}

export default http
