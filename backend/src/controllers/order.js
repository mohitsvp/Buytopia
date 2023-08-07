const Order = require("../models/order.model");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.send(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const addOrder = async (req, res) => {
    try {
        const userId = await req.user.id;
        const order = {
            product : req.body.product,
            userId,
            Address : req.body.Address,
            total : req.body.total
        }

        console.log(order);

        await Order.create(order);
        return res.send({message : "Order placed successfully"});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getOrders,
    addOrder
}