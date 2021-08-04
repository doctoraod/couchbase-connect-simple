var couchbase = require('couchbase');

// var cluster = new couchbase.Cluster(
//   'couchbase://localhost',
//   {
//     username: 'Administrator',
//     password: 'password'
//   }
// );

var cluster = new couchbase.Cluster(
  'couchbase://host.docker.internal',
  {
    username: 'Administrator',
    password: 'password'
  }
);

// Open a specific Couchbase bucket, `travel-sample` in this case.
var bucket = cluster.bucket('travel-sample');
// And select the default collection
var collection = bucket.defaultCollection();

module.exports = { cluster, bucket, collection }