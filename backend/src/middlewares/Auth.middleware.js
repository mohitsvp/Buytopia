const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const decodedToken = (token) => {
    const data = jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if(err) {
            return res.send("Invalid Token")
        }
        return decoded;
    })
    return data;
}


const authenticate = async (req, res, next) => {
    try {
        if (req.headers.authorization.startsWith('Bearer ')) {
            const token = req.headers.authorization.split(" ")[1];
            if (token === null) {
                return res.send("User is not logged in")
            }
            const {userId} = decodedToken(token)
            const user = await User.findOne({_id : userId});
            req.user = {
                id : userId,
                name : user.name,
                email : user.email,
                role : user.role
            }
        }
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    authenticate
}