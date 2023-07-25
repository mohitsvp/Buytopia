const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name : {type: String, required : true},
        description : {type: String}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;