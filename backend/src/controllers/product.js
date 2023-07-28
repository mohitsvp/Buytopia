const Category = require("../models/categories.model");
const Product = require("../models/product.model")

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.send({message: "Product created successfully"})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getProduct = async (req, res) => {
    try {
        const {id} = req.params.id;
        const product = await Product.findById(id);
        return res.send(product);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const addCategory = async (req, res) => {
    try {
        let category = await Category.find({name : req.body.name});
        if(category) {
            return res.send({message : "Category already exists"});
        }
        category = await Category.create(req.body);
        return res.send({message : "Category added successfully"});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        return res.send(category);
    } catch (error) {
        return res.send(error.message);
    }
}


module.exports = {
    addProduct,
    getProduct,
    getProducts,
    addCategory,
    getCategory
}