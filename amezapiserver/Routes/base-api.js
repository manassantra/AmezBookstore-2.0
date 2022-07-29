const express = require('express')
const baseapiRoute = express()

const userRoute = require('../Routes/user-routes')
const productRoute = require('../Routes/product-route')
const sellerRoute = require('../Routes/seller-route')
const orderRoute = require('../Routes/order-route')

baseapiRoute.use("/user", userRoute)
baseapiRoute.use("/v1", productRoute)
baseapiRoute.use("/seller", sellerRoute)
baseapiRoute.use("/order", orderRoute)


module.exports = baseapiRoute;