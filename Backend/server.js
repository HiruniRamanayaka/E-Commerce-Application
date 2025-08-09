const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB connection error: ", err.message);
        process.exit(1);
    })

// routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
