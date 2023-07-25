// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: String }],
  category : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Category'}],
  color : {type: String},
  brand : { type: mongoose.Schema.Types.ObjectId, ref : 'Brand'},
  discount : {type: Number},
  offers : [{type: mongoose.Schema.Types.ObjectId, ref : 'Offer'}],
  reviews : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Review'}],
  mfg : {type: String},
  stock : {type : Number},
  added_by : [{ type: mongoose.Schema.Types.ObjectId, ref : 'User'}]
},
{
    timestamps : true,
    versionKey : false
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
