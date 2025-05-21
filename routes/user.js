const express = require("express");
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");
const route = express.Router();
const User = require("../models/User");

route.put("/:id", verifyToken, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        );
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).json(err)
    }
})

//delete method
route.delete("/delete/:id", verifyTokenAndAutherization, async (req,res) => {
    try{

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been delete...");

    }catch(err){
        res.status(500).json(err)
    }
})

//get user
route.get("/find/:id", verifyTokenAndAdmin, async (req,res) => {
    try{

        const user = await User.findById(req.params.id)

        const {password , ...other} = user._doc;
        res.status(200).json({"user is" : other  });

    }catch(err){
        res.status(500).json(err)
    }
})

//get all user
route.get("/", verifyTokenAndAdmin, async (req,res) => {

    const query = req.query.new

    try{

        const users = query ? await User.find().sort({ _id: -1}).limit(5)
        : await User.findBy()

        res.status(200).json({"all users or filtered all users" : users  });

    }catch(err){
        res.status(500).json(err)
    }
})

//get user stats

route.get("/stats" , verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            { $match: { createdAt: {$gte: lastYear}}},
            {
                $project: { 
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            } 
        ])
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;