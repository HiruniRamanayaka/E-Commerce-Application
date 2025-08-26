const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ({ userName, email, password, countryCode, phone }) => {
    const existing = await User.findOne({ email });
    if(existing){
       throw new Error("Email already in use");
    }

    const fullPhone = `${countryCode}${phone}`;

    const user = new User({ userName, email, password, phone: fullPhone });
    await user.save();

    return {
        id: user._id, 
        userName: user.userName, 
        email: user.email,
        phone: user.phone, 
    };
};

const loginUser = async ({ email, password }) => {
    const existingUser = await User.findOne({ email });
    if(!existingUser){
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        message: "Login successful",
        token,
        user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            phone: existingUser.phone
        }
    };
};

module.exports = { registerUser, loginUser };