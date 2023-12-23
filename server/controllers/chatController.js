const { chatModel } =require("../models/chatSchema");

//createChat
//getUserCharts
//findChart

const creatChat = async (req, res) => {
    console.log("roter is colled");
    const { firstId, secondId } = req.body;
    console.log("req.body:",firstId, secondId);
    try {
        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } })
        if (chat) return res.status(200).json(chat)
        const newChat = new chatModel({ members: [firstId, secondId] })
        const response = await newChat.save()
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

const findUserChats=async(req,res)=>{
    const userId=req.params.userId;
    try{
        console.log("userchat is finding...");
        const chats=await chatModel.find({members:{$in:[userId]}})   //by using of in it will be find userId in all the field 
        console.log(chats);
        if (chats) return res.status(200).json(chats)
        res.json("not chats available")

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const findChat=async(req,res)=>{
    const {firstId,secondId}=req.params;
    try{
        const chat=await chatModel.findOne({members:{ $all: [firstId, secondId] }})   //by using of in it will be find userId in all the field 
        if (chat) return res.status(200).json(chat)

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports={creatChat,findUserChats,findChat}

