
const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    role:{
        type:String,
        default:'user'
    },
    verified : {
        type : Boolean,
        default : false
     },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String,
        unique:true
    },
    password : {
        type:String
    },
    image:{
        type:String
    },
    resume : {
        type:String
    },
    audio:{
        type:String
    }
    
});

const user = mongoose.model('user',userSchema);
module.exports = user;