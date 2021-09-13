'use strict';

const express = require('express');

require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors());

app.get('/weatherData', getWeather);

app.get('/movieData', getMovies);

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

  const dailyForecasts = results.data.daily;
  const forecastObjs = dailyForecasts.map(day => {
    return new Forecast(day);
  });
  console.log(forecastObjs);
  response.send(forecastObjs);
}

function timeToDate(dt) {
  let date = new Date(dt * 1000);
  console.log(date);
  return date.toISOString().substr(0, 10);
}

class Forecast {
  constructor(dailyForecastObj) {
    this.date = timeToDate(dailyForecastObj.dt);
    this.description = dailyForecastObj.weather[0].description;
  }
}

async function getMovies(request, response) {

  const results = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.search
    }
  });

  const movies = results.data.results;
  const movieObjs = movies.map(movie => {
    return new Movie(movie);
  });

  console.log(movieObjs);
  response.send(movieObjs);

}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.releaseDate = movieObj.release_date;
    this.img = movieObj.poster_path;
  }
}
