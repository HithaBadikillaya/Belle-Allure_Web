const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  quantity: { type: String },
});
module.exports = mongoose.model("cart", cartSchema);
