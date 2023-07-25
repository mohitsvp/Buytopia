const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        product : {types : mongoose.Schema.Types.ObjectId, ref : 'Product'},
        paymentStatus : {types : String, enum : ['Pending', 'Done', 'Failed']},
        orderStatus : {types : String, enum : ['Pending', 'Shipped', 'Delivered'] },
        trackingId : {types : mongoose.Schema.Types.ObjectId, ref : 'OrderTracking'},
        comments : {types : String},
        userId : {types : mongoose.Schema.Types.ObjectId, ref : 'User'},
        Address : {types : String},
        total : {types : Number}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;