const express = require('express')
const router = express.Router()
const {creatChat,findUserChats,findChat}=require('../controllers/chatController')
router.post("/", creatChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router
