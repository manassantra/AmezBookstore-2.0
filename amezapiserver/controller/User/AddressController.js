const express = require('express')
const addressController = express()
const Address = require('../../Models/address')
const User = require('../../Models/user')


// account base api :: http:://localhost:8089/api/user/address

// POST :: Create-Address
addressController.post("/create/:id", async(req, res)=>{
    const user = await User.findOne({_id: req.params.id})
    // const existAddress = await Address.findAll({uid: req.body.id});
    let address = new Address({
        uid: user._id,
        addressType: req.body.addressType,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        town: req.body.town,
        state: req.body.state,
        pinCode: req.body.pinCode,
        country: req.body.country,
        createdAt: Date.now(),
        createdBy: user.userName,
        isActive: true
    })

    address.save((err, doc)=>{
        if (err) {
            res.status(200).send(err);
        } else {
            try {
                res.status(200).send(doc);
            } catch(err) {
                res.status(209).send(err);
            }
        }
    })
})

// GET :: get all address of one user
addressController.get("/find/:id", async(req, res)=>{
    const address = await Address.find({uid: req.params.id})
    res.send(address)
})


// GET :: get single Address by id
addressController.get("/findone/:id", async(req, res)=>{
    const address = await Address.findOne({_id: req.params.id})
    res.send(address)
})



module.exports = addressController;