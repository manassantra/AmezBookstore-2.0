const express = require('express')
const auth = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Sellers = require('../../Models/seller')
const config = require('../../package.json')

// account base api :: http:://localhost:8089/api/user/auth


// GET :: Login Controller
auth.post("/login", async(req, res)=>{
    let seller;
    if (isNaN(parseInt(req.body.username))) {
        // if email
        seller = await Sellers.findOne({userName: req.body.username});
    } else if (!isNaN(parseInt(req.body.username))) {
        // if mobile
        seller = await Sellers.findOne({mob: req.body.username});
    }

    if(seller) {
        let Pass = req.body.password; 
        let storedPass = seller.password; 
        const passwordMatch = await bcrypt.compare(Pass, storedPass);
        // console.log(secret.configuration);
        if (passwordMatch) {
            const token = jwt.sign(
                { _id: seller._id },
                config.secret_key,
                { expiresIn: "1h" }
              );
              res.status(200).send({
                token: token,
                expiresIn: 12 * 60 * 60,
                auth: true,
                passportId: seller._id
              });
        } else {
            res.status(209).send({"error": "Wrong Password !"})
        }
    } else {
        res.status(409).send("Did not find any registered-user with this Email-Id / Mobile-Number.");
    }
})



module.exports = auth;