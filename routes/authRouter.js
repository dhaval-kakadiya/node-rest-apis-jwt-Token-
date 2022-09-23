const express = require('express')
const router = express.Router()

const userAuth = require('../middleware/jwtAuth')

const use = (roles) => (req, res, next) => {
  Promise.resolve(roles(req, res, next).catch(error => {
    next(error)
  }))
}

const { login, registration } = require('../controllers/authController')

router.post('/login', login)
router.post('/registration', userAuth(['admin']), use(registration))

module.exports = router
