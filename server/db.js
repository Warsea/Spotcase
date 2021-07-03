const Pool = require('pg').Pool;
require('dotenv').config();

// password: 'wasiflight15243',

const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'postinger',
});

module.exports = pool;
