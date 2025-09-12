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

        public: { 
            type: Boolean, 
            default: true 
        },

        // Admin-only fields
        email: { 
            type: String, 
            trim: true 
        },
        phone: { 
            type: String, 
            trim: true 
        },
        address: { 
            type: String, 
            trim: true },

        dateOfBirth: { 
            type: Date 
        },
        nationalID: { 
            type: String, 
            trim: true 
        },
        salary: { 
            type: Number 
        },
        employmentStatus: { 
            type: String, 
            enum: ["active", "on leave", "terminated"], 
            default: "active" 
        },
        notes: { 
            type: String, 
            trim: true 
        },

    },
    {timestamps: true}
);

module.exports = mongoose.model("Employee", employeeSchema);