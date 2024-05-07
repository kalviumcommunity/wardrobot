const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dressType: {
        type: String,
        required: true
    },
    occasion: {  
        type: String,
        required: true
    }
});

const DataSet = mongoose.model('DataSet', dataSchema); 
module.exports = DataSet;
