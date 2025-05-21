const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {type:String, require: true, unique: true},
    products: [{
        productId: {type: String},
        quantity: {type: Number, deafult:1}
    }],
    

},
{
    timestamps: true
}
)

module.exports = mongoose.model("cart", cartSchema);