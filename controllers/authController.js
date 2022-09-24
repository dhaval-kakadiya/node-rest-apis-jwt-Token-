const User = require('../models/user')
const jwt = require('jsonwebtoken')

// <<<<<<<<<<<<<<<<<<<<<<<< REGISTRATION >>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.registration = async (req, res) => {
  try {
    const user = new User()
    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.phone = req.body.phone
    user.email = req.body.email
    user.password = req.body.password

    const userData = await user.save()
    return res.status(200).json({
      success: true,
      message: 'User Successfully Register',
      data: userData
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User Not Register'
    })
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(422).json({
        success: false,
        message: 'You Are Not Register Plz Register First !!'
      })
    }
    if (user.password !== password) {
      return res.status(422).json({
        success: false,
        message: 'Your Password Incorrect !!'
      })
    }

    const token = jwt.sign({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role

    }, process.env.SECRET_KEY, { expiresIn: '24h' })

    return res.status(200).json({
      success: true,
      message: 'User Login Successfully',
      Token: token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User Login Failed !!'
    })
  }
}
