const express = require('express')
const sellerRoute = express()

const sellerAccount = require('../controller/Seller/AccountController')
const sellerAuth = require('../controller/Seller/AuthController')


// Seller Acount-Controller
sellerRoute.use("/account", sellerAccount)

// Seller Auth-Controller
sellerRoute.use("/auth", sellerAuth)


module.exports = sellerRoute;