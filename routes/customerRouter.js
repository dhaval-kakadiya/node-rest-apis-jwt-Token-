const express = require('express')
const router = express.Router()

const { addCustomer, getCustomer, getCustomerById, updateCustomerById, deleteCustomer, addProductId } = require('../controllers/customerController')

router.post('/', addCustomer)
router.get('/', getCustomer)
router.get('/:id', getCustomerById)
router.put('/:id', updateCustomerById)
router.delete('/:id', deleteCustomer)
router.delete('/product-update/:id', addProductId)

module.exports = router
