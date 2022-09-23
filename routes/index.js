const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter')
const userRouter = require('./userRouter');
const customerRouter = require('./customerRouter');
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')


router.use('/',authRouter);
router.use('/user',userRouter);
router.use('/customer',customerRouter);
router.use('/category',categoryRouter);
router.use('/product',productRouter);


module.exports = router;
