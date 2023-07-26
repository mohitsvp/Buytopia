const User = require("../models/user.model");

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
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.formData.email, password : req.body.formData.password});
        if(!user) {
            return res.status(404).send("Invalid credentials");
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}


module.exports = {
    getUser,
    register,
    login
}