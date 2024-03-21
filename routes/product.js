const express = require("express");
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");
const route = express.Router();
const Product = require("../models/Product");

//create

route.post("/" , verifyTokenAndAdmin,  async(req,res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json({"status": "saved" , data: savedProduct});
    }catch(err){
        res.status(500).json(err)
    }

})


//update product
route.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        );
        res.status(200).json(updateProduct);
    }catch(err){
        res.status(500).json(err)
    }
})

//delete product
route.delete("/delete/:id", verifyTokenAndAdmin, async (req,res) => {
    try{

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been delete...");

    }catch(err){
        res.status(500).json(err);
    }
})

//get product
route.get("/find/:id", async (req,res) => {
    try{

        const product = await Product.findById(req.params.id);
        res.status(200).json({"product" : product  });

    }catch(err){
        res.status(500).json(err)
    }
})

//get all products
route.get("/", async (req,res) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;
    //console.log(qCategory)

    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }else if (qCategory){
            products = await Product.find({
                category: {
                    $in: [qCategory],
                },
            });
        }else {
            products = await Product.find();
        }

        res.status(200).json({"all products or filtered products" : products  });

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = route;