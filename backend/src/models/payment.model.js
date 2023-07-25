const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        orderId : {type : mongoose.Schema.Types.ObjectId, ref : 'Order'},
        amount : {type : String},
        paymentDate : {type : Date}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment