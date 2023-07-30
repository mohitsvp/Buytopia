const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
    const {productId, quantity}  = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({user : userId});

        if (!cart) {
            cart = new Cart({ user : userId, products : []})
        }

        const existingProduct = cart.products.find((item) => item.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        }
        else {
            cart.products.push({product : productId, quantity : quantity})
            cart.userId = userId
        }

        await cart.save();

        console.log(cart);

        return res.send("Item added to cart");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({userId}).populate('products.product');
        console.log(cart)
        return res.send(cart);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    addToCart,
    getCart
}