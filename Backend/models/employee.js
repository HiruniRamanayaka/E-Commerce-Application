const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true
        },
        speciality: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Employee", employeeSchema);