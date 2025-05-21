const express = require("express");
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");
const route = express.Router();
const Order = require("../models/Order");

//create
route.post("/", verifyToken,  async(req,res) => {
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json({"status": "saved" , data: savedOrder});
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})


//update order
route.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        );
        res.status(200).json(updateOrder);
    }catch(err){
        res.status(500).json(err)
    }
})

//delete order
route.delete("/delete/:id", verifyTokenAndAdmin, async (req,res) => {
    try{

        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
})

//get user orders
route.get("/find/:id", verifyTokenAndAutherization, async (req,res) => {
    try{

        const orders = await Order.find({userId: req.params.id});
        res.status(200).json({"order" : orders  });

    }catch(err){
        res.status(500).json(err);
    }
})

//get all orders

route.get("/" , verifyTokenAndAdmin, async (req,res) => {
    try{
        const orders = await Order.find();
        res.status(200).json({"all orders": order});
    }
    catch(err){
        res.status(500).json(err);
    }
})

//get monthly income
route.get("/income" , verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try{
        const income = await Order.aggregate([
            {$match: { createdAt: {$gte: previousMonth } } },
            { 
                $project:{
                    month: { $month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales"},
                },
            },   
        ])
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;