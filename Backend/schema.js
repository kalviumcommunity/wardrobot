const mongoose = require('mongoose')

const data = new mongoose.Schema({
    image:String
})
const dataSet = mongoose.model('dataSet',data)
module.exports=dataSet