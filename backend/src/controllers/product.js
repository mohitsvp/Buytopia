const Brand = require("../models/brand.model");
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
        const products = await Product.find().populate([{path : 'category', select : 'name'}, {path : 'brand', select : 'name'}]);
        return res.send(products);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate([{path : 'category', select : 'name'}, {path : 'brand', select : 'name'}]);;
        return res.send(product);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const addCategory = async (req, res) => {
    try {
        let category = await Category.find({name : req.body.name});
        if(category.length > 0) {
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

const addBrand = async (req, res) => {
    try {
        let brand = await Brand.find({name : req.body.name});
        if(brand.length > 0) {
            return res.send({message : "Brand already exists"});
        }
        brand = await Brand.create(req.body);
        return res.send({message : "Brand added successfully"});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getBrand = async (req, res) => {
    try {
        const brand = await Brand.find();
        return res.send(brand);
    } catch (error) {
        return res.send(error.message);
    }
}


module.exports = {
    addProduct,
    getProduct,
    getProducts,
    addCategory,
    getCategory,
    addBrand,
    getBrand
}