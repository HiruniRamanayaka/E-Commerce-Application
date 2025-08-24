const User = require('../models/user.js');

const registerUser = async ({ userName, email, password }) => {
    const existing = await User.findOne({ email });
    if(existing){
       return { error: "Email already in use" };
    }

    const user = new User({ userName, email, password });
    await user.save();

    return {
        id: user._id, 
        userName: user.userName, 
        email: user.email 
    };
};

module.exports = { registerUser };