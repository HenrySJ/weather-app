const axios = require('axios')

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  url: 'https://weather-app-caching.herokuapp.com/api/weather?lat=33.44&lon=-112.07',
}

export default http
