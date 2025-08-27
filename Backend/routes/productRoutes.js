const express = require("express");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

//get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
    }
});

// Get top 6 products by ratings
router.get("/top-rates", async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ "rating.rate": -1})  //sorted by high to low
            .limit(6);
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching top rated products:", err.message);
        res.status(500).json({error: "Server error"});
    }
});

//get single products
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }else{
            res.status(200).json(product);
        }
    } catch (err) {
        console.error(err.message);
    }
});

//add a product
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    console.log("Incoming POST:", req.body);
    try {
        const {name, price, description, ingredients, image} = req.body;
        if(!name || !price || !description || !ingredients || !image ) {
            return res.status(400).json({error: "All fields are required"});
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
router.put("/:id", verifyToken, authorizeRoles("Admin"), async (req, res) => {
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

module.exports = router;