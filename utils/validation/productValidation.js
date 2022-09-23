const Joi = require('joi')

const productSchema = Joi.object({
  product_name: Joi.string().empty().min(2).required().trim().messages({
    'string.empty': 'Product Name must be required.',
    'string.min': 'Product name should have a minimum length of 2',
    'any.required': 'Product name must be required.'
  }),
  product_detail: Joi.string().empty().min(2).trim().messages({
    'string.empty': 'Product Detail must be required.',
    'string.min': 'Product Detail should have a minimum length of 2'

  }),
  categoryId: Joi.string().required().empty().messages({
    'string.empty': 'categoryId must be required.',
    'any.required': 'categoryId must be required.'
  })

})

module.exports = productSchema
