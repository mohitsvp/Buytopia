const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        products : [{type : mongoose.Schema.Types.ObjectId, ref : 'Products'}],
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;