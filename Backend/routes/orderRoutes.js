const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { 
  placeOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus, 
  getOrdersByPickupTime,
  cancelOrder
} = require("../controllers/orderController");

const router = express.Router();

// Place an order from cart
router.post("/", verifyToken, authorizeRoles("customer"), placeOrder);

// Get user orders
router.get("/", verifyToken, authorizeRoles("customer"), getUserOrders);

// Admin: Get all orders
router.get("/all", verifyToken, authorizeRoles("admin"), getAllOrders);

// Admin: Update order status
router.put("/:id/status", verifyToken, authorizeRoles("admin"), updateOrderStatus);

// Pickup time filter for admin
router.get("/by-time/:time", verifyToken, authorizeRoles("admin"), getOrdersByPickupTime);

// Customer: Cancel order before it's ready
router.put("/:id/cancel", verifyToken, authorizeRoles("customer"), cancelOrder);

module.exports = router;
