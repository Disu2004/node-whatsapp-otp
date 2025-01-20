// Import mongoose
const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  state: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model
module.exports = Contact;
