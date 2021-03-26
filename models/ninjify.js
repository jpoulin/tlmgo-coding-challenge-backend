const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ninjifyAttributes = new Schema({
ninjaName: {
  type: String,
  required: true
 },
techWord: {
  type: String,
  required: true
 },
creationDate: {
  type: Date,
  required: true,
  default: new Date()
 }
});

const Ninjify = mongoose.model("ninjalist", ninjifyAttributes);

module.exports = Ninjify;