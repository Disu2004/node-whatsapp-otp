const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const Register = require('./model/RegisterSchema'); // Import the Register schema
const Cart = require("./model/Cart_schema"); // Import the Cart schema
const Product = require("./model/ProductSchema");
const Contact = require("./model/ContactSchema");
const User = require('./model/UserSchema'); // Import the User schema

app.use(express.json());
app.use(cors());
const DB = "mongodb+srv://dishantu2004:Mahadev123@cluster0.bckzn54.mongodb.net/Hackathon?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add a product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log("Product added:", product);
    res.json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// app.js (Express Server)
app.post('/addToCart', async (req, res) => {
  const { productId } = req.body;

  console.log("Received request to add to cart:", req.body);

  if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
  }

  try {
      const product = await Product.findById(productId);
      if (!product) {
          console.log("Product not found:", productId);
          return res.status(404).json({ error: "Product not found" });
      }

      // Handle adding to cart logic here (you may want to implement some session or user management)
      const cartItem = await Cart.findOneAndUpdate(
          { productId: product._id }, // Assuming you manage cart without userId
          { 
              $inc: { quantity: 1 }, // Increment quantity
              $set: { 
                  name: product.name, 
                  price: product.price, 
                  category: product.category, 
                  url: product.url,
                  userRating: product.userRating,
                  giftType: product.giftType 
              } 
          },
          { upsert: true, new: true }
      );

      console.log("Cart item updated:", cartItem);
      res.json(cartItem);
  } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


app.get('/cart', async (req, res) => {
  try {
      const cartItems = await Cart.find();
      console.log("Fetched cart items:", cartItems); // Log the fetched items
      res.json(cartItems);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});


// Delete a cart item
// Delete an item from the cart
app.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedItem = await Cart.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  });
  