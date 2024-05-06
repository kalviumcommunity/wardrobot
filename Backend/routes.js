const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path')
const router = express.Router();
const Outfit = require('./schema');
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})

router.post('/upload',upload.single('file'),(req,res)=>{
    Outfit.create({image : req.file.filename})
    .then(result => res.json(result))
    .catch(err=>console.log(err))
})
router.get('/getImage',(req,res)=>{
    Outfit.find()
    .then(users=>res.json(users))
    .catch(err=>console.log(err))
})
module.exports = router;