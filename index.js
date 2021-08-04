var bodyParser = require('body-parser');
var cors = require('cors');
var cluster = require('./couchbase/connection');
var express = require('express');

// Set up our express application
var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({
      error: err,
    });
    return;
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ping', async (req, res) => {
  const result = await cluster.ping();
  res.send({
    result
  });
});

app.get('/airports', async (req, res) => {
  const searchTerm = 'SFO';

  let qs;
  if (searchTerm.length === 3) {
    // FAA code
    qs = `SELECT airportname from \`travel-sample\` WHERE faa = '${searchTerm.toUpperCase()}';`;
  } else if (
    searchTerm.length === 4 &&
    (searchTerm.toUpperCase() === searchTerm ||
      searchTerm.toLowerCase() === searchTerm)
  ) {
    // ICAO code
    qs = `SELECT airportname from \`travel-sample\` WHERE icao = '${searchTerm.toUpperCase()}';`;
  } else {
    // Airport name
    qs = `SELECT airportname from \`travel-sample\` WHERE LOWER(airportname) LIKE '%${searchTerm.toLowerCase()}%';`;
  }

  const result = await cluster.query(qs);
  const rows = result.rows;

  res.send({
    data: rows,
    context: [qs],
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port http://localhost:3001/ping or http://localhost:3001/airports!');
});
