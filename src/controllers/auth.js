const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email, username from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  let { email, password, username } = req.body
  try {
    const hashedPassword = await hash(password, 10)
    if (!username) {
      username = email
    }

    const newUser =await db.query('insert into users(email,password,username) values ($1 , $2, $3)', [
      email,
      hashedPassword,
      username
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was successfull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
    
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: 'none', // Important for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      domain: process.env.NODE_ENV === 'production' ? '.your-domain.com' : 'localhost'
    }).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user.user_id,
        email: user.email,
      username: user.username,
        role: user.role,
      }
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
