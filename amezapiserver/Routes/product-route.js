const express = require('express');
const productRoute = express();
const productController = require('../controller/Product/ProductController')
const productCategory = require('../controller/Product/CategoryController')

// Product-Controller
productRoute.use("/products", productController)


// Product-Category controller
productRoute.use("/productCategory", productCategory)

module.exports = productRoute;