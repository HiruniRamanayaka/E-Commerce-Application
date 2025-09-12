const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            hot: { type: Boolean, default: false },
            cold: { type: Boolean, default: false }
        },
        rating: {
            rate: { type: Number, default: 0 }
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);