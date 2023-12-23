const express = require('express');
const router=express.Router();
const {userRegister,userLogin,findUser,getUser}=require("../controllers/usercontroller.js")

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/find/:userId',findUser);
router.get('/getUser',getUser);

module.exports = router;