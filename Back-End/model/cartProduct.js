const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    productId: {
      ref:"product",
      type:String
    },
    quantity: {
      type: Number,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart_products", cartSchema);

module.exports = cartModel;
