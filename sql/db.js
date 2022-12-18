/* Import pg client */
const Pool = require("pg").Pool;

/* Import env */
require('dotenv').config()

/* Connect to DB */
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = pool;
