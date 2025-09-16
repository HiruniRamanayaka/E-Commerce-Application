const express = require("express");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

//get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({ isActive: true}).select("name description image category rating sizeOptions price");
        // console.log(JSON.stringify(products, null, 2));
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get top 6 products by ratings
router.get("/top-rates", async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ "rating.rate": -1})  //sorted by high to low
            .limit(6)
            .select("name description image category rating sizeOptions price");
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching top rated products:", err.message);
        res.status(500).json({error: "Server error"});
    }
});

//get single products
router.get("/:id", verifyToken, authorizeRoles("customer", "admin"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        // Remove admin-only fields
        delete product.adminNotes;
        delete product.createdBy;
        delete product.isActive;

        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

//add a product
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
  console.log("Incoming POST:", req.body);
  try {
    const { name, price, description, ingredients, image, sizeOptions } = req.body;

    if (!name || !description || !ingredients || !image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hasValidPrice =
      typeof price === "number" && price >= 0;

    const hasValidSizeOptions =
      Array.isArray(sizeOptions) &&
      sizeOptions.length > 0 &&
      sizeOptions.every(opt => typeof opt.price === "number" && opt.price >= 0 && typeof opt.size === "string");

    if (!hasValidPrice && !hasValidSizeOptions) {
      return res.status(400).json({
        error: "Either a valid base price or sizeOptions must be provided",
      });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(400).json({ error: err.message });
  }
});

//update a product
router.put("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedProduct) {
            return res.status(404).json({error: "Product not found"});
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product: ", err);
        res.status(400).json({ error: err.message });
    }
});

// delete a product (admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product is not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;