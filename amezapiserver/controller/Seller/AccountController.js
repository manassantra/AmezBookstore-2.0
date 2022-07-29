
const express = require('express')
const sellerAccount = express()
const bcrypt = require('bcryptjs')
const Sellers = require('../../Models/seller')

// account base api :: http:://localhost:8089/api/user/account

// POST :: CREATE USER
sellerAccount.post("/register", async (req, res)=>{
    const checkUsername = await Sellers.findOne({userName: req.body.userName});
    const checkMobile = await Sellers.findOne({mob: req.body.mobile});

    const saltPass = await bcrypt.genSalt(15);
    const hasPass = await bcrypt.hash(req.body.password, saltPass);
    let seller = new Sellers({
        fullName: req.body.fullName,
        userName: req.body.userName,
        gender: req.body.gender,
        mob: req.body.mobile,
        password: hasPass,
        isActive: true,
        createdAt: Date.now()
    });

    if (checkUsername || checkMobile) {
        res.status(202).send({"error": "One Account already registered with this Mob/Email"})
    } else {
        seller.save((err, doc)=>{
            if(err){
               res.statusCode(409).send({"error": "error while saving data"}) ;
            } else {
                try {
                    res.status(200).send(doc);
                } catch(err) {
                    res.status(209).send(err);
                }
            }
        });
    }
})

// GET :: ALL USERS
sellerAccount.get("/all", async(req, res)=>{
    Sellers.find((err, doc)=>{
        if(err) {
            res.status(404).send('Did not get any result');
        } else if (doc.length < 0) {
            res.status(200).send({"error": "No Data Found."})
        } else {
            doc.forEach(e => {
                e.password = '********',
                e.mob = `XXXXXXXXXX`

            });
            res.status(200).send(doc);
        }
    })
})

// GET :: Find User by id
sellerAccount.get('/:id', async(req, res)=>{
    const Cust = await Sellers.findOne({_id : req.params.id} , { password: 0 });
    if (Cust) {
        res.status(200).send(Cust);
    } else {
        res.status(209).send({"error": "Did not find any user"})
    }
})


module.exports = sellerAccount;
