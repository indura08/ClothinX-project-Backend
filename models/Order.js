const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {type:String, require: true, unique: true},
    products: [{
        productId: {type: String},
        quantity: {type: Number, deafult:1}
    }],

    amount: {type: Number, required: true},
    address: {type: Object , reqired: true},
    status: {type: String, default: "pending"},
    

},
{
    timestamps: true
}
)

module.exports = mongoose.model("order", orderSchema);