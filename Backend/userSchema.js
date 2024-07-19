const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    profile:{
        type: String,
        required: true
    },
    followers:[{
        type: String,
        required: false
    }],
    following:[{
        type: String,
        required: false
    }]
});

const UserData = mongoose.model('userProfile',userSchema);
module.exports = UserData;