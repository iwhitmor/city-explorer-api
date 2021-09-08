'use strict';

const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('no place like home');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
