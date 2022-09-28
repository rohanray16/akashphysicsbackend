const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  
  email: { type: String },
  verified: {type: Boolean},
  payment_id: { type: String },
  order_id: {type: String},
  payment_signature: {type: String}
});

const PaymentModel = mongoose.model("payment", PaymentSchema);

module.exports = PaymentModel;
