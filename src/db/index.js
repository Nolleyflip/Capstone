const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auth',
  password: 'adnama12',
  port: 5432,
  connection: 'postgresql://whatever:obiWmRunlRBCWCfb0OA4j9fdX3maA6pu@dpg-csh6ek08fa8c73f6thf0-a.oregon-postgres.render.com/capstone_database_d3rl'
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
