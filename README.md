# Welcome to jWeather!

Production version is live on [Heroku](https://hbsj-weather.herokuapp.com/)!

## Features:

- Responsive.
- Displays current weather, 7 day forcast, and 48h hourly.
- You can search for weather data for every city in the US.

## Full Stack

- The production version gets all of its weather info from my custom db and caching api
- the db caches the weather info from open weather map to avoid request throttling and saves api call costs
- You can you view the db repo on my github or [here](https://github.com/HenrySJ/weather-app-api)!

## Setup (to run on local machine):

- Create a free account at [openweathermap.org](https://home.openweathermap.org/users/sign_up) for your apiKey.

- In the root of the project directory, create a .env file and store your API\*KEY and IP*TOKEN.
  \*\*\_FYI*\*\*
  \*IN REACT, YOU MUST PREFIX YOUR .ENV VARIABLES WITH REACT_APP & RESTART THE DEV SERVER AFTER CHANGES TO .ENV\*\*

> I.E
> REACT_APP_API_KEY=
> REACT_APP_IP_TOKEN=

### Important!

- In the `handleSubmit` method of the home component, delete _&auth=${process.env.REACT_APP_GEO_TOKEN}_ from the http requests.

- GEO_TOKEN is used to prevent [geocode.xyz](https://geocode.xyz/) from throttling requests to 1 per second.

```javascript
const { data } = await http.get(
  `https://geocode.xyz/${city}?geoit=json&region=US&auth=${process.env.REACT_APP_GEO_TOKEN}`
)
```
