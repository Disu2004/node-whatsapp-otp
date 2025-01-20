// Product.js (Mongoose model)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  url: String,
  userRating: {     // Added user rating
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  giftType: {       // Added gift type
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
