const express = require('express');
const router = express.Router();


const {addProduct,getProduct,getProductById,updateById,deleteProduct,addCategory} = require('../controllers/productController')

router.post('/',addProduct);
router.get('/',getProduct);
router.get('/:id',getProductById);
router.put('/:id',updateById);
router.delete('/:id',deleteProduct);
router.delete('/product-update/:id',addCategory);



module.exports = router;
