'use strict';

const express = require('express');

require('dotenv').config();

const app = express();
// const weatherData = require('./data/weather.json');

const cors = require('cors');
app.use(cors());

app.get('/weatherData', getWeather);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

const axios = require('axios');

async function getWeather(request, response) {

  const results = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
    params: {
      appid: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon
    }
  });
  response.send(results.data);
}

// class Forecast {
//   constructor() {
//     this.date = ;
//     this.description = ;
//   }
// }
