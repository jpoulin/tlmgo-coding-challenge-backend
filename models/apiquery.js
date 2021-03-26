const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apiQueryAttributes = new Schema({
request: {
  type: String,
  required: true
 },
data: {
  type: String,
  required: true
 },
ip: {
    type: String,
    required: true
},
date: {
  type: Date,
  required: true,
  default: new Date()
 }
});

const ApiQuery = mongoose.model("apiqueries", apiQueryAttributes);

module.exports = ApiQuery;