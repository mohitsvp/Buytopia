const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema(
    {
        name : {type : 'string'},
        number : {type : 'string'},
        street : {type : 'string'},
        city : {type : 'string'},
        state : {type : 'string'},
        pinCode : {type : 'string'}
    }
)
const orderSchema = new mongoose.Schema(
    {
        product : [{type : mongoose.Schema.Types.ObjectId, ref : 'Product'}],
        paymentStatus : {type : String, enum : ['Pending', 'Done', 'Failed'], default : 'Done'},
        orderStatus : {type : String, enum : ['Pending', 'Shipped', 'Delivered'], default : 'Pending'},
        trackingId : {type : mongoose.Schema.Types.ObjectId, ref : 'OrderTracking'},
        comments : {type : String},
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        Address : addressSchema,
        total : {type : Number}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;