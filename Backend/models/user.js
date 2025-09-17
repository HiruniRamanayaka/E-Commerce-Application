const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    }
},{ timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Hash password when using findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update) return next();
  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 12);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});

module.exports = mongoose.model("User", userSchema);