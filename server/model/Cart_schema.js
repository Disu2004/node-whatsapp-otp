const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: String, // or mongoose.Schema.Types.ObjectId, depending on your user schema
        required: true
    },
    name: String,
    price: Number,
    category: String,
    url: String,
    userRating: Number,
    giftType: String,
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Cart', cartSchema);
