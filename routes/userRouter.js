const express = require('express')
const router = express.Router()
const userAuth = require('../middleware/jwtAuth')

const use = (roles) => (req, res, next) => {
  Promise.resolve(roles(req, res, next).catch(error => {
    next(error)
  }))
}

const upload = require('../middleware/upload')

const { getUser, getUserById, updateUser, deleteUser, uploadUserImage, uploadUserResume, multerImg, multerResume, multerAudio } = require('../controllers/userController')

// <<<<<<<<<<< multer routeas >>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/multerimg', upload.single('image'), multerImg)
router.post('/multerresume', upload.single('pdf'), multerResume)
router.post('/multeraudio', upload.single('audio'), multerAudio)

// UPLOAD IMAGE/RESUME -- USING JAVASCRIPT'S routes >>>>>>>>>>>>>>>>>>>>>>>>
router.post('/upload-resume', uploadUserResume)
router.post('/upload-image', uploadUserImage)

// <<<<<<<<<<< MAIN GET-PUT-DELETE ROUTES WITH AUTHENTICATE >>>>>>>>>>>>>>>>
router.get('/', getUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
