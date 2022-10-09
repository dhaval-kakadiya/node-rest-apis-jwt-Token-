const User = require('../models/user')
const path = require('path')
const fs = require('fs')

exports.getUser = async (req, res) => {
  try {
    const allUser = await User.find()
    return res.status(200).json({
      success: true,
      message: 'User Successfully Read',
      data: allUser
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'User Read Failed'
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findById(_id)
    return res.status(200).json({
      success: true,
      message: 'User Successfully Read By ID',
      data: user
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'User Read Failed'
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true })

    return res.status(200).json({
      success: true,
      message: 'User Successfully Update By ID',
      data: user
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'User Update Failed'
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findByIdAndDelete(_id)

    return res.status(200).json({
      success: true,
      message: 'User Successfully Deleted',
      data: user
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'User Not Delete'
    })
  }
}

// <<<<<<<<<<<<<<<<<<<<<<< UPLOAD USER IMAGE >>>>>>>>>>>>>>>>>>>>>>

exports.uploadUserImage = async (req, res) => {
  const email = req.body.email
  const imagepath = imagePath()

  const baseImage = req.body.image
  if (!baseImage.startsWith('data:')) {
    return res.status(404).json({
      success: false,
      message: 'Wrong Base64'
    })
  }

  // find Extension of File >>>>>>>>>>

  const fileExtension = baseImage.substring(
    baseImage.indexOf('/') + 1,
    baseImage.indexOf(';base64')
  )

  const fileType = baseImage.substring('data'.length, baseImage.indexOf('/'))

  // Forming regex to extract base64 data of file.
  const regex = new RegExp(`^data:${fileType}\/${fileExtension};base64,`, 'gi')

  const base64 = baseImage.replace(regex, '')
  const fileName = `${new Date().valueOf()}.${fileExtension}`
  const finleFilePath = path.join(imagepath, fileName)
  await writeFile(finleFilePath, base64, 'base64')
  // fs.writeFileSync(finleFilePath, base64, 'base64');
  const user = await User.findOneAndUpdate({ email })
  if (user) {
    return res.status(200).json({
      success: true,
      message: 'file uploaded successfully !',
      image: `/images/${fileName}`
    })
  } else {
    return res.status(404).json({
      success: false,
      message: 'failed to upload file !'
    })
  }
}

const imagePath = () => {
  const workingDir = process.cwd()
  const imagePath = path.join(workingDir, '/public/images')
  return imagePath
}

//  <<<<<<<<<<<<<<<<<<<<<<< UPLOAD USER Resume >>>>>>>>>>>>>>>>>>>>>>

exports.uploadUserResume = async (req, res) => {
  const email = req.body.email
  const resumepath = resumePath()

  const baseResume = req.body.resume
  if (!baseResume.startsWith('data:')) {
    return res.status(404).json({
      success: false,
      message: 'Wrong Base64'
    })
  }

  // find Extension of File >>>>>>>>>>

  const fileExtension = baseResume.substring(
    baseResume.indexOf('/') + 1,
    baseResume.indexOf(';base64')
  )

  const fileType = baseResume.substring('data'.length, baseResume.indexOf('/'))

  // Forming regex to extract base64 data of file.
  const regex = new RegExp(`^data:${fileType}\/${fileExtension};base64,`, 'gi')

  const base64 = baseResume.replace(regex, '')
  const fileName = `${new Date().valueOf()}.${fileExtension}`
  const finleFilePath = path.join(resumepath, fileName)
  await writeFile(finleFilePath, base64, 'base64')
  // fs.writeFileSync(finleFilePath, base64, 'base64');
  const user = await User.findOneAndUpdate({ email })
  if (user) {
    return res.status(200).json({
      success: true,
      message: 'file uploaded successfully !',
      image: `/resume/${fileName}`
    })
  } else {
    return res.status(404).json({
      success: false,
      message: 'failed to upload file !'
    })
  }
}

const resumePath = () => {
  const workingDir = process.cwd()
  const resumePath = path.join(workingDir, '/public/resume')
  return resumePath
}

// <<<<<<<<<<<<<<<<<<<<<<<  MULTER >>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<< MULTER IMAGE >>>>>>>>>>>>>>>>>>>>>

exports.multerImg = async (req, res) => {
  try {
    const email = req.body.email
    if (!email) {
      return res.status(422).json({
        success: false,
        message: 'email not found'
      })
    }
    const { filename } = req.file

    const multerUser = await User.findOneAndUpdate({ email }, { image: filename }, { new: true })
    if (!multerUser) {
      return res.status(422).json({
        success: false,
        message: 'Image Not Upload'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfull Image Uploaded',
      Data: multerUser,
      image: `/images/${filename}`
    })
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'Image Not Upload'
    })
  }
}

// <<<<<<<<<<<<<<<<<< MULTER PDF >>>>>>>>>>>>>>>>>>>>>>>>>>
exports.multerResume = async (req, res) => {
  try {
    const email = req.body.email
    if (!email) {
      return res.status(422).json({
        success: false,
        message: 'email not found'
      })
    }
    const { filename } = req.file

    const multerUser = await User.findOneAndUpdate({ email }, { resume: filename }, { new: true })
    if (!multerUser) {
      return res.status(422).json({
        success: false,
        message: 'User Not Found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfull Resume Uploaded',
      Data: multerUser,
      Resume: `/pdf/${filename}`
    })
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'Resume Not Upload'
    })
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<< MULTER AUDIO >>>>>>>>>>>>>>>>>>>>>>>>

exports.multerAudio = async (req, res) => {
  try {
    const email = req.body.email
    if (!email) {
      return res.status(422).json({
        success: false,
        message: 'email not found'
      })
    }
    const { filename } = req.file

    const multerUser = await User.findOneAndUpdate({ email }, { audio: filename }, { new: true })
    if (!multerUser) {
      return res.status(422).json({
        success: false,
        message: 'User Not Found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfull Resume Uploaded',
      Data: multerUser,
      Resume: `/audio/${filename} `
    })
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'Resume Not Upload'
    })
  }
}
