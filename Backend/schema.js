const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    dressType: {
        type: String,
        required: false
    },
    occasion: {  
        type: String,
        required: false
    },
    timesUsed:{
        type: Number,
        required:false,
        default:0
    },
    favOutfit:{
        type:Boolean,
        required:false,
        default:false
    }
});

const DataSet = mongoose.model('DataSet', dataSchema); 
module.exports = DataSet;

