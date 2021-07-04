const Pool = require('pg').Pool;
require('dotenv').config();

// password: 'wasiflight15243',

const pool = new Pool({
  user: process.env.user,
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: process.env.database,
});

module.exports = pool;
