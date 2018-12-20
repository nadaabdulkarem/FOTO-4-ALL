// configure postgres to connect our database to our express app
var pgPromise = require('pg-promise');
var pgInstance = pgPromise();

var config = {
  host: 'localhost',
  port: 5432,
  database: 'your_table',
  user: 'nadaabdulkarem'
}

var connection = pgInstance( process.env.DATABASE_URL ||config);

module.exports = connection;