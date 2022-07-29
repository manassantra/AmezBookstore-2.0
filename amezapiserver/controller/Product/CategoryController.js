const express = require('express')
const categoryController = express()

const ProductCategory = require('../../Models/product-category')


// product base api :: http:://localhost:8089/api/v1/productCategory


// POST :: Create Product Category
categoryController.post("/create", async(req, res)=>{
    const prdCategory = await ProductCategory.findOne({categoryName: req.body.categoryName})

    let category = new ProductCategory({
        id: `AMZ` + `PRD` + (new Date()).getTime().toString(8).slice(8),
        categoryName: req.body.categoryName,
        categoryDescription: req.body.description,
        avtar: req.body.avtar,
        createdAt: Date.now(),
        createdBy: req.body.sellerId,
        isActive: true
    })

    if (prdCategory) {
        res.status(209).send({"error": "This Product Category Already Exist"});
    } else {
        try {
            category.save((err, doc)=>{
                if (err) {
                    res.status(409).send(err);
                } else {
                    res.status(200).send(doc);
                }
            })
        } catch (err) {
            res.status(409).send(err);
        }
    }
})


// GET :: All Categories
categoryController.get("/all", async(req, res)=>{
    ProductCategory.find((err, doc)=>{
        if (err) {
            res.status(209).send(err)
        } else {
            try {
                res.status(200).send(doc)
            } catch (err) {
                res.status(209).send(err)
            }
        }
    })
})



module.exports = categoryController;