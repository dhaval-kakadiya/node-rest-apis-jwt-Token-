const Category = require('../models/category')

exports.addCategory = async (req, res) => {
  try {
    const category = new Category()

    category.category_name = req.body.category_name

    const categoryData = await category.save()

    return res.status(200).json({
      success: true,
      message: 'Category Added Successfully',
      Data: categoryData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Category Adding Failed !!'
    })
  }
}

exports.getCategory = async (req, res) => {
  try {
    const readCategory = await Category.find()

    return res.status(200).json({
      success: true,
      message: 'Category Read Successfully',
      allCategory: readCategory
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
