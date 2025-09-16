const express = require("express");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

// Place an order from cart
router.post("/", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalPrice,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod || "cod",
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user.userId }); // clear cart after order

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user orders
router.get("/", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("items.product", "name image");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all orders
router.get("/all", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "userName email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update order status
router.put("/:id/status", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
