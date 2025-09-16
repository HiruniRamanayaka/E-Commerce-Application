const mongoose = require("mongoose");

// Size option subdocument schema
const sizeOptionSchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // e.g. "Small", "Medium", "Large"
    price: { type: Number, required: true, min: 0 } // price per size
  },
  { _id: false }
);

// Main Product schema
const productSchema = new mongoose.Schema(
  {
    // Public fields
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },

    // base price (for items without size options)
    price: { type: Number, min: 0 },

    category: {
      hot: { type: Boolean, default: false },
      cold: { type: Boolean, default: false }
    },
    rating: {
      rate: { type: Number, default: 0 },
    },

    // Customer-friendly fields
    ingredients: { type: [String], required: true },
    allergens: { type: [String], default: [] },
    sizeOptions: { type: [sizeOptionSchema], default: [] },
    availability: { type: Boolean, default: true }, // temporarily unavailable toggle

    // Admin-only fields
    isActive: { type: Boolean, default: true },
    adminNotes: { type: String },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
