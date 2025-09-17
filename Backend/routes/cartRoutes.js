const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const {
  increaseItem,
  decreaseItem,
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/increase", verifyToken, authorizeRoles("customer"), increaseItem);

router.post("/decrease", verifyToken, authorizeRoles("customer"), decreaseItem);

router.get("/", verifyToken, authorizeRoles("customer"), getCart);

router.post("/add", verifyToken, authorizeRoles("customer"), addToCart);

// Remove product from cart
router.delete("/remove/:productId/:size", verifyToken, authorizeRoles("customer"), removeFromCart);

// Clear cart
router.delete("/clear", verifyToken, authorizeRoles("customer"), clearCart);

module.exports = router;