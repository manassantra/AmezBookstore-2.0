const express = require('express')
const orderRoute = express()

const orderController = require('../controller/Orders/OrderController')

// Order-Controller
orderRoute.use("/", orderController)



module.exports = orderRoute;