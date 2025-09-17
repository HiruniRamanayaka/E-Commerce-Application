const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { 
  getAllProducts, 
  getTopRatedProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

//get all products
router.get("/", getAllProducts);

// Get top 6 products by ratings
router.get("/top-rates", getTopRatedProducts);

//get single products
router.get("/:id", verifyToken, authorizeRoles("customer", "admin"), getProductById);

//add a product
router.post("/", verifyToken, authorizeRoles("admin"), createProduct);

//update a product
router.put("/:id", verifyToken, authorizeRoles("admin"), updateProduct);

// delete a product (admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteProduct);

module.exports = router;