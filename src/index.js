const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(passport.initialize())
app.use(morgan('dev'))

//import routes
const authRoutes = require('./routes/auth')
const businessesRoutes = require('./routes/businesses')
const reviewsRoutes = require('./routes/reviews')

//initialize routes
app.use('/api', authRoutes)
app.use('/api', businessesRoutes)
app.use('/api/reviews', reviewsRoutes)

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
