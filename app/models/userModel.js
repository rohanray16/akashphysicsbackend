const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: {type: Number},
  paid: { type: Boolean },
  query: {type: String},
  address: {type: String}
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
