const express=require('express')
const router=express.Router()
const {createMessge,getMessages}=require('../controllers/messgaeController')

router.post("/", createMessge);
router.get("/:chatId", getMessages);


module.exports = router