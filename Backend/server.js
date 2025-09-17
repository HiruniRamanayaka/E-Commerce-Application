const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const productRoutes = require('./routes/productRoutes');
const emailRoutes = require('./routes/email');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth')
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use('/api/products', productRoutes);
app.use('/email', emailRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
