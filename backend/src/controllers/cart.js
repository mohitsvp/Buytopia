const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
    const {product, quantity}  = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({userId : userId});

        if (!cart) {
            cart = new Cart({ user : userId, products : []})
        }

        const existingProduct = cart.products.find((item) => item.product.toString() === product);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        }
        else {
            cart.products.push({product : product, quantity : quantity})
            cart.userId = userId
        }

        await cart.save();

        return res.send("Item added to cart");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.find({userId}).populate('products.product');
        return res.send(cart[0].products);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params
        const cart = await Cart.findOneAndUpdate({userId}, {
             $pull: { products: { _id: id } } , 
        }, 
        {new : true}).populate('products.product')

        return res.status(204).send("Data updated successfully")
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    addToCart,
    getCart,
    deleteItem
}