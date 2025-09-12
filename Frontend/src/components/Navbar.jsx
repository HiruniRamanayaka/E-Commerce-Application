import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "/logo.png";
import { ShoppingCart, User } from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, userName } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinkStyle = (isActive) =>
    `text-amber-900 hover:text-gray-900 transition border-b-2 ${
      isActive ? "text-gray-900 border-gray-900" : "border-transparent"
    }`;

  const dropdownItemStyle =
    "block w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-yellow-100 transition";

  return (
    <nav className="bg-light px-10 py-2 shadow-sm flex justify-between items-center">
      {/* Brand */}
      <NavLink to="/" className="flex items-center space-x-2">
        <img src={logo} alt="CaféNova Logo" className="h-15 w-auto" />
        <h1 className="text-xl font-semibold text-amber-900">CaféNova</h1>
      </NavLink>

      {/* Navigation */}
      <div className="flex items-center space-x-6">
        {/* Core Links */}
        {token && role === "customer" ? (
          <>
            <NavLink to="/customer/dashboard" className={({ isActive }) => navLinkStyle(isActive)}>
              Home
            </NavLink>
            <NavLink to="/coffees" className={({ isActive }) => navLinkStyle(isActive)}>
              Shop
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className={({ isActive }) => navLinkStyle(isActive)}>
              Home
            </NavLink>
            <NavLink to="/coffees" className={({ isActive }) => navLinkStyle(isActive)}>
              Our Coffees
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => navLinkStyle(isActive)}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => navLinkStyle(isActive)}>
              Contact
            </NavLink>
          </>
        )}

        {/* Auth Links */}
        {!token && (
          <>
            <NavLink to="/login" className={({ isActive }) => navLinkStyle(isActive)}>
              Login
            </NavLink>
            <NavLink
              to="/signUp"
              className={({ isActive }) =>
                `bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition shadow-md ${
                  isActive ? "text-gray-900 border-gray-900" : "border-transparent"
                }`
              }
            >
              SignUp
            </NavLink>
          </>
        )}

        {/* Customer Links */}
        {token && role === "customer" && (
          <>
            <NavLink to="/customer/cart" className="text-amber-900 hover:text-gray-900">
              <ShoppingCart className="w-5 h-5" />
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-amber-900 hover:text-gray-900"
              >
                <User className="w-5 h-5" />
                <span>{userName}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <NavLink to="/customer/profile" className={dropdownItemStyle}>
                    My Profile
                  </NavLink>
                  <NavLink to="/customer/orders" className={dropdownItemStyle}>
                    My Orders
                  </NavLink>
                  <NavLink to="/customer/settings" className={dropdownItemStyle}>
                    Settings
                  </NavLink>
                  <button onClick={handleLogout} className={dropdownItemStyle}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;