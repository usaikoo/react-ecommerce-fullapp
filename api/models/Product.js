const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: Array },
    size: { type: Array },
    price: { type: Number, required: true },
    inStock:{type:Boolean, default:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
