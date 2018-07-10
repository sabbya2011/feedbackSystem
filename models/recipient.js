const mongoose = require('mongoose');

const Recipients = new mongoose.Schema({
    email:String,
    responded:{
        type:Boolean,
        default:false
    }
});
module.exports = Recipients;