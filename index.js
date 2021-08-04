var bodyParser = require('body-parser');
var cors = require('cors');
var couchbase = require('couchbase');
var express = require('express');
var cluster = new couchbase.Cluster(
  'couchbase://localhost',
  {
    username: 'Administrator',
    password: 'password'
  }
);

// Open a specific Couchbase bucket, `travel-sample` in this case.
var bucket = cluster.bucket('travel-sample');
// And select the default collection
var coll = bucket.defaultCollection();

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

app.listen(3001, () => {
  console.log('Example app listening on port http://localhost:3001/ping !');
});
