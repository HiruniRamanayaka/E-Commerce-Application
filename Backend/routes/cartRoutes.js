const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

// Get user cart
router.get("/", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate("items.product", "name price image");
    res.status(200).json(cart || { user: req.user.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product to cart
router.post("/add", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const { productId, quantity, selectedSize } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId &&
                item.selectedSize?.size === selectedSize?.size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1, selectedSize: selectedSize || null });
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image");
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from cart
router.delete("/remove/:productId", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image");
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cart
router.delete("/clear", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;