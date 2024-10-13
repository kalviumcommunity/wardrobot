const express= require('express')
const router = express.Router()
const userAuthController=require('./userAuthController')
router.post('/signup', userAuthController.registerUser);
router.post('/signin', userAuthController.loginUser);

module.exports = router;
