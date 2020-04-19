const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const Seller =require('../models/seller')
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.listRelated = (req, res) => {
console.log("dsjsf",req.body.sellerId)    
Product.find({seller:req.body.sellerId},  (err, product) => {

    if (err || !product) {
      return res.status(400).json({
        error: "err products",
      });
    }
  console.log("product",product)
if(product) return  res.json({
    size: product.length,
    product
});
  
  }
  
    )
    };
    // Product.find({ _id: { $ne: req.product }, category: req.product.category })
    // .limit(limit)
    // .populate('seller', '_id name')
    // .exec((err, products) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'Products not found'
    //         });
    //     }
    //     res.json(products);
    // });