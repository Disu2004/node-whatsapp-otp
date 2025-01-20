const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    url: String
  });
  
  module.exports = mongoose.model('Cart', CartSchema);