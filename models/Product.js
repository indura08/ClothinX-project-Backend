const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type:String, require: true, unique: true},
    desc: {type: String , required: true},
    img: {type: String, required: true, unique: true},
    category: {type: Array},
    size: {type: Array},
    color: {type: Array},
    price: {type: Number, required: true},
    inStoke: {type: Boolean, default:true},

},
{
    timestamps: true
}
)

module.exports = mongoose.model("product", productSchema);