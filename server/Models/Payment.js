const mongoose = require("mongoose");
const { Schema } = mongoose;
const PaymentSchema = new Schema({
  Order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  payment_method: {
    type: String,
  },
  transaction_id: {
    type: Number,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("payment", PaymentSchema);
