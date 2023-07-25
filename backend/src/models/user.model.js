const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : {type: String},
        email : {type: String, required: true},
        password : {type: String, required: true},
        address : {type: String},
        role : {type: String, default : 'user', enum : ['admin', 'user', 'superadmin']},
        profile_pic : {type: String}
    },
    {
        versionKey : false,
        timestamps : true
    }
)


const User = mongoose.model('User', userSchema);

module.exports = User;