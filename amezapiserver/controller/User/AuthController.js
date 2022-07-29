const express = require('express')
const auth = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../Models/user')
const config = require('../../package.json')

// account base api :: http:://localhost:8089/api/user/auth


// GET :: Login Controller
auth.post("/login", async(req, res)=>{
    let user;
    if (isNaN(parseInt(req.body.username))) {
        // if email
        user = await User.findOne({userName: req.body.username});
    } else if (!isNaN(parseInt(req.body.username))) {
        // if mobile
        user = await User.findOne({mob: req.body.username});
    }

    if(user) {
        let Pass = req.body.password; 
        let storedPass = user.password; 
        const passwordMatch = await bcrypt.compare(Pass, storedPass);
        // console.log(secret.configuration);
        if (passwordMatch) {
            const token = jwt.sign(
                { _id: user._id },
                config.secret_key,
                { expiresIn: "1h" }
              );
              res.status(200).send({
                token: token,
                expiresIn: 12 * 60 * 60,
                auth: true,
                passportId: user._id
              });
        } else {
            res.status(209).send({"error": "Wrong Password !"})
        }
    } else {
        res.status(409).send("Did not find any registered-user with this Email-Id / Mobile-Number.");
    }
})



module.exports = auth;