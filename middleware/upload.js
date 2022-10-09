const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, './public/images')
    }
    if (file.fieldname === 'pdf') {
      cb(null, './public/pdf')
    }
    if (file.fieldname === 'audio') {
      cb(null, './public/audio')
    }
  },
  filename: (req, file, cb) => {
    const fileName = Date.now().valueOf() + path.extname(file.originalname) 
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'audio/mpeg') {
    cb(null, true)
  } else {
    cb(new Error('invalid FileType !!'))
  }
}

const upload = multer({ storage, fileFilter })
module.exports = upload
