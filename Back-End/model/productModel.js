const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    ProductName:{
        type:String
    },
    BrandName:{
        type:String
    },
    Category:{
        type:String,
    },
    ProductImage:{
        type:[String],
    },
    Price:{
        type:String
    },
    SellingPrice:{
        type:String,
        required:true
    },
    Description:{
        type:String
    }
}, {timestamps:true});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;