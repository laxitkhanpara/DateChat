const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    profilpic: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    gender:{
        type: String,
        required: true,
    }

}, { timestamps: true });


const Users = new mongoose.model("Users", userSchema);
module.exports = { Users }
