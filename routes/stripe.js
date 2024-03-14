const express = require("express");
const route = express.Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

route.post("/payment" , (req,res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "Rupees",
    } , (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }

    });
})

module.exports = route;

//nawattuwe 1:50:55
