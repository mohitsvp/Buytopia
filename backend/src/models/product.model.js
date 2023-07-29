// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage : { type: Number, required: true},
  rating : { type: Number, required: true},
  images: [{ type: String }],
  category : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Category'}],
  stock : {type : Number},
  added_by : [{ type: mongoose.Schema.Types.ObjectId, ref : 'User'}],
  brand : { type: mongoose.Schema.Types.ObjectId, ref : 'Brand'},
  thumbnail : { type: String}  
},
{
    timestamps : true,
    versionKey : false
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


