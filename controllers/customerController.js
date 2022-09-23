const Customer = require('../models/customer')

exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer()

    customer.customer_name = req.body.customer_name
    customer.product_id = req.body.product_id

    const customerData = await customer.save()

    return res.status(200).json({
      success: true,
      message: 'Customer Added Successfully',
      Data: customerData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Customer Adding Failed !!'
    })
  }
}

exports.getCustomer = async (req, res) => {
  try {
    const readCustomer = await Customer.find().populate({ path: 'product_id', populate: { path: 'categoryId' } })

    return res.status(200).json({
      success: true,
      message: 'Customer Read Successfully',
      allCustomer: readCustomer
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getCustomerById = async (req, res) => {
  try {
    const _id = req.params.id
    const readCustomer = await Customer.findById(_id)

    return res.status(200).json({
      success: true,
      message: 'Customer Read By ID Successfully',
      ProductById: readCustomer
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Reading Failed !!'
    })
  }
}

exports.updateCustomerById = async (req, res) => {
  try {
    const _id = req.params.id
    const updateCustomer = await Customer.findByIdAndUpdate(_id, req.body, { new: true })

    return res.status(200).json({
      success: true,
      message: 'Customer Update By ID Successfully',
      customerById: updateCustomer
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Update Failed !!'
    })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const _id = req.params.id
    const deleteCustomer = await Customer.findByIdAndDelete(_id)

    return res.status(200).json({
      success: true,
      message: 'Product Delete Successfully',
      deletedCustomer: deleteCustomer
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Product Delete Failed !!'
    })
  }
}

exports.addProductId = async (req, res) => {
  try {
    const _id = req.params.id
    const productId = req.body.productId

    const getCustomer = await Customer.findById(_id)

    if (!getCustomer) {
      return res.status(422).json({
        success: false,
        message: 'Invalid Product Id'
      })
    }

    getCustomer.productId = productId
    await getCustomer.save()

    return res.status(200).json({
      success: true,
      message: 'Category Successfully Added ',
      data: getCustomer
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
