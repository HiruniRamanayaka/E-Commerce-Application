const express = require("express");
const Employee = require("../models/employee")
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router = express.Router();

//get employees for public view
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ public: true }).select("name position experience speciality image");
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching public employees:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// get all the employees for admin
router.get("/all", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

//get an employee
router.get("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//add an employee (admin only)
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    console.log("Incoming POST:", req.body);
    try {
        const {name, position, experience, speciality, image} = req.body;
        if(!name || !position || !experience || !speciality || !image ) {
            return res.status(400).json({error: "All fields are required"});
        }
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error("Error saving employee:", err);
        res.status(400).json({ error: err.message });
    }
});

//update an employee (admin only)
router.put("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedEmployee) {
            return res.status(404).json({error: "Employee not found"});
        }

        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error("Error updating employee: ", err.message);
        res.status(400).json({ error: err.message });
    }
});

// delete an employee (admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;