const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products : {type : mongoose.Schema.Types.ObjectId, ref : 'Product'},
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;