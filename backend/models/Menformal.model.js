const mongoose = require("mongoose");

const menformalSchema = mongoose.Schema({
  identifier: String,
  productno: Number,
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discount: Number,
  frontimgsrc: { type: String, required: true },
  hidenimgsrc: String,
  cutoffPrice: Number,
  producttagstext: { type: String, required: true },
  plogosrc: String,
});

const Menformal = mongoose.model("menformal", menformalSchema);

module.exports = {Menformal};
