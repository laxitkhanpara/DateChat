const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

//connection to the database
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("db connected");
}).catch((error) => {
    console.log(error);
})


const userRouter = require('./Routes/userRouter');
app.use("/", userRouter)
const chatRoute = require('./Routes/chatRoute');
app.use("/chats", chatRoute)
const messageRoute = require('./Routes/messageRoute');
app.use("/messages", messageRoute)

//server connection
const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})
