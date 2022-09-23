const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema =new Schema({
    product_name : {
        type :String
    },
    price : {
        type:Number
    },
    product_detail : {
        type : String
    },
    categoryId : {
        type :Schema.Types.ObjectId,
        ref : 'category'
    }
});

const product = mongoose.model('product',productSchema);

module.exports = product ;