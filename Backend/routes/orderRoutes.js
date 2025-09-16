const express = require("express");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

// Place an order from cart
router.post("/", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).sort({ createdAt: -1 }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const orderItems = cart.items.map((item) => {
      const price = item.selectedSize?.price ?? item.product?.price;

      if (typeof price !== "number") {
        throw new Error(` Missing price for item ${item.product?._id}`);
      }

      return {
        product: item.product._id,
        quantity: item.quantity,
        price,
      };
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalPrice,
      phoneNumber: req.body.phoneNumber,
      pickupTime: req.body.pickupTime || null,
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

// Pickup time filter for admin
router.get("/by-time/:time", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const orders = await Order.find({ pickupTime: req.params.time }).populate("user", "userName");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customer: Cancel order before it's ready
router.put("/:id/cancel", verifyToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.userId });

    if (!order) return res.status(404).json({ error: "Order not found" });

    if (["ready", "completed", "cancelled"].includes(order.status)) {
      return res.status(400).json({ error: "Order cannot be cancelled at this stage" });
    }

    order.status = "cancelled";
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate("items.product", "name image");
    res.status(200).json({ message: "Order cancelled", order: populatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
