const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema =new Schema({
    customer_name:{
        type : String
    },
    product_id : {
        type:Schema.Types.ObjectId,
        ref : 'product'
    }
});

const customer = mongoose.model('customer',customerSchema);

module.exports = customer;