const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  category_name: {
    type: String
  }
})

const category = mongoose.model('category', categorySchema)

module.exports = category
