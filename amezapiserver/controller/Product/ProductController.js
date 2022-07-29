const express = require('express')
const { findOneAndUpdate } = require('../../Models/product')
const productController = express()
const Products = require('../../Models/product')


// product base api :: http:://localhost:8089/api/v1/products


// POST :: Create-Product
productController.post("/create/:id", async(req, res)=>{

    let product = new Products({
        id: (new Date()).getTime().toString(10).slice(4),
        name: req.body.name,
        description: req.body.description,
        avtar: req.body.avtar,
        avtar2: req.body.avtar2,
        avtar3: req.body.avtar3,
        price: req.body.price,
        ISBN: req.body.isbn,
        author: req.body.author,
        categories: req.body.categories,
        quantity: req.body.quantity,
        createdAt: Date.now(),
        createdBy: req.params.id,
        isActive: true
    })

    product.save((err, doc)=>{
        if (err) {
            res.status(209).send(err);
        } else {
            try {
                res.status(209).send(doc);
            } catch(err) {
                res.status(209).send(err);
            }
        }
    })
})


//  GET :: All Products
productController.get("/all", async(req, res)=>{
    Products.find((err, doc)=>{
        if (err) {
            res.status(209).send(err)
        } else {
            res.status(200).send(doc)
        }
    })
})


//  GET :: Products by Id
productController.get("/:id", async(req, res)=>{
    const product = await Products.find({id: req.params.id})
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(209).send({"error": "Error 404 Not Found"});
    }
})

//  GET :: Products by Id
productController.get("/productId/:id", async(req, res)=>{
    const product = await Products.findOne({id: req.params.id})
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(209).send({"error": "Error 404 Not Found"});
    }
})

// UPDATE :: Product update by ProductId
productController.put("/update/:id", async(req, res)=>{
    await Products.findOneAndUpdate({id: req.params.id}, req.body, {new: true}).then(data =>{
        if (!data) {
            res.send({"error": "Data didn't update successfully."})
        } else {
            res.send(data);
        }
    })
})

// Filter :: Product by any category
productController.get("/filter/:value", async(req, res)=>{
    const products = await Products.find({categories: req.params.value})
    res.send(products)
})

module.exports = productController;