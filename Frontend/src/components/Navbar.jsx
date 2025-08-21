import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png"; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-10 py-2 shadow-sm flex justify-between items-center">
      
      {/* Brand Section */}
      <div className="flex items-center space-x-2">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="CaféNova Logo" className="h-15 w-auto" />
          <h1 className="text-xl font-semibold text-amber-900">CaféNova</h1>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <NavLink to="/" 
            className={({ isActive }) => `text-amber-900 hover:text-gray-900 transition border-b-2 ${
                isActive ? "text-gray-900 border-gray-900" : "border-transparent"
            }`
            }
        >
            Home
        </NavLink>
        <NavLink to="/coffees" 
            className={({ isActive }) => `text-amber-900 hover:text-gray-900 transition border-b-2 ${
                isActive ? "text-gray-900 border-gray-900" : "border-transparent"
            }`
            }
        >
            Our Coffees
        </NavLink>
        <NavLink to="/about" 
            className={({ isActive }) => `text-amber-900 hover:text-gray-900 transition border-b-2 ${
                isActive ? "text-gray-900 border-gray-900" : "border-transparent"
            }`
            }
        >
            About
        </NavLink>
        <NavLink to="/contact" 
            className={({ isActive }) => `text-amber-900 hover:text-gray-900 transition border-b-2 ${
                isActive ? "text-gray-900 border-gray-900" : "border-transparent"
            }`
            }
        >
            Contact
        </NavLink>
      </div>
      
    </nav>
  );
}

export default Navbar;