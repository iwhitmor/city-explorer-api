'use strict';

const express = require('express');

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
