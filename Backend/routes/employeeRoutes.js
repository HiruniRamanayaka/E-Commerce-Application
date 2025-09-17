const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { 
  getPublicEmployees, 
  getAllEmployees, 
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

const router = express.Router();

//get employees for public view
router.get("/", getPublicEmployees);

// get all the employees for admin
router.get("/all", verifyToken, authorizeRoles("admin"), getAllEmployees);

//get an employee (admin)
router.get("/:id", verifyToken, authorizeRoles("admin"), getEmployeeById);

//add an employee (admin only)
router.post("/", verifyToken, authorizeRoles("admin"), createEmployee);

//update an employee (admin only)
router.put("/:id", verifyToken, authorizeRoles("admin"), updateEmployee);

// delete an employee (admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteEmployee);

module.exports = router;