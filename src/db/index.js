const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  connectionString: process.env.CONNECTION,
  ssl: {
    rejectUnauthorized: false,
  }
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
