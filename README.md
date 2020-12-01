# Welcome to jWeather!

## Setup:

- Create a free account at [openweathermap.org](https://home.openweathermap.org/users/sign_up) for your apiKey
- Create a free account at [ipinfo.io](https://ipinfo.io/) for your ipToken.

> In "/src/config" create a default.json file and store your apikey and ipToken in camel notation.
>
> > i.e:
> > {
> > "apiKey" : "apiKey goes here",
> > "ipToken": "ipToken goes here"
> > }

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

- Fully responsive
- Finds user's current location and displays current weather, 8 day forcast, and 48h hourly.
- User can search for weather data for every city in the US

## Future features:

- Caching of weather data by city
- robust error handling
- autocomplete city names in the search box
