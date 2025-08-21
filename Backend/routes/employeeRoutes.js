const express = require("express");
const Employee = require("../models/employee")

const router = express.Router();

//get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err.message);
    }
});

//add an employee
router.post("/", async (req, res) => {
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

//update an employee
router.put("/:id", async (req, res) => {
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
        console.error("Error updating employee: ", err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;