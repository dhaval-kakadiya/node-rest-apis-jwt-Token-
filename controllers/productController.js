const Product = require('../models/product')

exports.addProduct = async (req, res) => {
  try {
    const product = new Product()

    product.product_name = req.body.product_name
    product.price = req.body.price
    product.product_detail = req.body.product_detail
    product.categoryId = req.body.categoryId

    const productData = await product.save()

    return res.status(200).json({
      success: true,
      message: 'Product Added Successfully',
      product: productData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Adding Failed !!'
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const readProduct = await Product.find().populate('categoryId')

    return res.status(200).json({
      success: true,
      message: 'Product Read Successfully',
      allProduct: readProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Reading Failed !!'
    })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const _id = req.params.id
    const readProduct = await Product.findById(_id)

    return res.status(200).json({
      success: true,
      message: 'Product Read By ID Successfully',
      ProductById: readProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Reading Failed !!'
    })
  }
}

exports.updateById = async (req, res) => {
  try {
    const productId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })

    return res.status(200).json({
      success: true,
      message: 'Product Update By ID Successfully',
      ProductById: updateProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Update Failed !!'
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const deleteProduct = await Product.findByIdAndDelete(productId)

    return res.status(200).json({
      success: true,
      message: 'Product Delete Successfully',
      ProductById: deleteProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Update Failed !!'
    })
  }
}

exports.addCategory = async (req, res) => {
  try {
    const productId = req.params.id
    const categoryId = req.body.categoryId

    const getProduct = await Product.findById(productId)

    if (!product) {
      return res.status(422).json({
        success: false,
        message: 'Invalid Product Id'
      })
    }

    getProduct.categoryId = categoryId
    await getProduct.save()

    return res.status(200).json({
      success: true,
      message: 'Category Successfully Added ',
      data: getProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
