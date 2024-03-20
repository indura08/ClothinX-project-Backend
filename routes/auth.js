const express = require("express");
const route = express.Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

route.post("/register", async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        //me register ekedi encypt krnwa wagema login ekedi me encrypt krpu eka decrypt krgnna one
    });

    try{
        const saveduser = await newUser.save();
        res.status(200).json({states: "successfull" , savedUser: saveduser});
    }
    catch(err){
        res.status(500).json(err);
    }
})

//login
route.post("/login" , async (req,res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        console.log(user)
        if (!user) {
            return res.status(401).json("Wrong credentials!");
        } 
       
        // meken kiynne password eka encrypt krnna kiyla meka encrypt krna widiyk 
        const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);

        const OriginalPassword = hashPassword.toString(CryptoJs.enc.Utf8);

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,

        }, process.env.JWT_SEC,
            {expiresIn: "18d"}
        ) //meken puluwan me json web token athule monw hari apita one krna ape schema athul;e thiyna (userge)
        //data ki payak daala ewa check wena widiya anuwa balala authentication saha autherization hdgnna

        //OriginalPassword !== req.body.password && res.status(401).json("wrong password!");

        if(OriginalPassword !== req.body.password){
            console.log("methna awla thiynne");
            return res.status(401).json("wrong password");
            
        }
        
        const { password, ...other } = user._doc;

        return res.status(200).json({...other, accessToken , "status" : "login successfull"});

        

    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }

})

module.exports = route




