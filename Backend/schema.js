const mongoose = require('mongoose')

const data = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    shirts:{
        type: String,
        required:false
    },
    pants:{
        type:String,
        required:false
    },
    accessory:{
        type:String,
        required:false
    },
    occasion:{
        type:String,
        required:true
    }
})
const dataSet = mongoose.model('dataSet',data)
module.exports=dataSet