const express = require("express");
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");
const route = express.Router();
const Cart = require("../models/Cart");

//create
route.post("/", verifyToken,  async(req,res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json({"status": "saved" , data: savedCart});
    }catch(err){
        res.status(500).json(err)
    }

})


//update cart
route.put("/:id", verifyTokenAndAutherization, async (req,res) => {
    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        );
        res.status(200).json(updateCart);
    }catch(err){
        res.status(500).json(err)
    }
})

//delete cart
route.delete("/delete/:id", verifyTokenAndAutherization, async (req,res) => {
    try{

        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
})

//get user cart
route.get("/find/:id", verifyTokenAndAutherization, async (req,res) => {
    try{

        const cart = await Cart.find({userId: req.params.id});
        res.status(200).json({"cart" : cart  });

    }catch(err){
        res.status(500).json(err)
    }
})

//get all

route.get("/" , verifyTokenAndAdmin, async (req,res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json({"all carts": carts});
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = route;