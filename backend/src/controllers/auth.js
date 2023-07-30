const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    return jwt.sign({userId : user._id}, process.env.JWT_KEY, {
        expiresIn : "1d"
    })
}

const getUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }   
}

const register = async (req, res) => {
    try {
        const user = await User.create(req.body.formData);
        const token = generateToken(user);
        return res.cookie("token", token).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email, password : req.body.password});
        if(!user) {
            return res.status(404).send("Invalid credentials");
        }
        const token = generateToken(user);
        return res.send(token);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}


module.exports = {
    getUser,
    register,
    login
}