// Included all dependencies
const express = require('express')
require('dotenv').config();
const app=express()
// Created an separate endpoint to test the server
app.get('/test',(req,res)=>{
    res.send('server running!');
})
// included the port from env file
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is runnig on Port:${port}...`)
})