const mongoose = require("mongoose");
const { Schema } = mongoose;
const ShippingSchema = new Schema({
  Order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("shipping", ShippingSchema);
