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
        let queryObject = {};

        if(req.query.category !== '' && req.query.category !== undefined) {
            queryObject["category"] = {$in : req.query.category};
        }

        if(req.query.brands !== '' && req.query.brands !== undefined) {
            queryObject["brand"] = {$in : req.query.brands};
        }

        if(req.query.price !== '' && req.query.price !== undefined) {
            queryObject["price"] = {$lte : req.query.price};
        }

        if(req.query.rating !== '' && req.query.rating !== undefined) {
            queryObject["rating"] = {$lte : req.query.rating};
        }

        if(req.query.discount !== '' && req.query.discount !== undefined){
            queryObject["discountPercentage"] = {$gte : req.query.discount};
        }

        const products = await Product.find(queryObject).populate([{path : 'category', select : 'name'}, {path : 'brand', select : 'name'}]);
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