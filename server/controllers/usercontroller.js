const { Users } = require("../models/userSchema")
const {genrateTocken} = require('../middlewares/jwtToken')
const validator = require('validator')
const bcrypt = require('bcrypt')



const userRegister = async (req, res) => {
    try {
        console.log("req.bodey:",req.body);
        const { profilpic, username, password,gender } = req.body
        const userfind = await Users.find({ username })
        console.log("userfind:", userfind);
        if (!userfind === "") return res.status(400).json("Username is already exist")
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({
            profilpic, username, password: hashedPassword,gender
        })
        user.save()
        console.log("user._id:",user._id);
        const token = genrateTocken(user._id)       
        res.status(200).json({ _id: user._id, username, password,gender, token })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const userLogin = async (req, res) => {
    try {
        console.log("req.body:",req.body);
        const { username, password } = req.body
        const user = await Users.find({ username })
        console.log(user);

        if (!user)
            return res.status(400).json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid)
            return res.status(400).json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        res.status(500).json(error)
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await Users.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await Users.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { userRegister, userLogin, findUser, getUser }