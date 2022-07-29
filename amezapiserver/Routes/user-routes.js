const express = require('express');
const userRoutes = express();
const accountRoute = require('../controller/User/AccountController')
const authRoute = require('../controller/User/AuthController')
const addressRoute = require('../controller/User/AddressController')


// User Account-Controller
userRoutes.use("/account", accountRoute)

// User Auth-Controller
userRoutes.use("/auth", authRoute)

// User Auth-Controller
userRoutes.use("/address", addressRoute)


module.exports = userRoutes;