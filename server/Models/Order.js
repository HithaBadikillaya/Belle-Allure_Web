const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderDetails = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  total: {
    type: String,
  },
  quantity: {
    type: String,
  },
});
const OrderSchema = new Schema({
  OrderDetails: [OrderDetails],
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  status: {
    type: String,
  },
  GrandTotal: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("order", OrderSchema);
