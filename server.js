'use strict';

const express = require('express');

const axios = require('axios');

const app = express();
const weatherData = require('./data/weather.json');

const cors = require('cors');
app.use(cors());

app.get('/weatherData', (request, response) => {
  response.json(weatherData);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

const results = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={WEATHER_API_KEY}`, {
  params: {
    key: process.env.WEATHER_API_KEY,
    lat,
    lon,
  }
});

class Forecast {
  constructor() {
    this.date = ;
    this.description = ;
  }
}