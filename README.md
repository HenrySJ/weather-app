# Welcome to jWeather!

## Setup:

- Create a free account at [openweathermap.org](https://home.openweathermap.org/users/sign_up) for your apiKey
- Create a free account at [ipinfo.io](https://ipinfo.io/) for your ipToken.

- In the root of the project directory, create a .env file and store your API*KEY and IP_TOKEN.
  ***FYI***
  \*IN REACT, YOU MUST PREFIX YOUR .ENV VARIABLES WITH REACT_APP*\*

> I.E
> REACT_APP_API_KEY=
> REACT_APP_IP_TOKEN=

### Important!

- In the try block of the `handleSubmit` method of the home component, delete _&auth=${config.geoToken}_ from the _res_, and _detailedRes_ http requests.

- geoToken is used to prevent [geocode.xyz](https://geocode.xyz/) from throttling requests to 1 per second.

```javascript
//                                 below this ->  V----------------------V
const res = await http.get(
  `https://geocode.xyz/${value}?json=1?region=US&auth=${config.geoToken}`
);
const detailedRes = await http.get(
  `https://geocode.xyz/${res.data.latt},${res.data.longt}?json=1&auth=${config.geoToken}`
);
```

## Features:

- Responsive
- Finds user's current location and displays current weather, 8 day forcast, and 48h hourly.
- User can search for weather data for every city in the US

## Future features:

- Caching of weather data by city in a Mongodb db built with Node.js and express
