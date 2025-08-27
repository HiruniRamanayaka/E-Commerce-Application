import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    countryCode: "+94",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation 
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,12}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;        // Not submit if invalid inputs
    
  try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        userName: formData.userName,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "colored", 
    });
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Signup failed", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
    });
  }
};

  return (
    <>
    <ToastContainer />
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="/coffee-bg.jpg"
          alt="Coffee background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
      </div>

      {/* SignUp Card */}
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl border border-yellow-100 p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 text-yellow-700 hover:text-yellow-900 text-2xl font-bold"
          aria-label="Close SignUp"
        >
          <X />
        </button>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#3e2c1d] text-center mb-4 pt-2 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-sm text-[#5a3e2b] text-center mb-6 italic">
          Join us and start your coffee journey
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* UserName */}
          <div>
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Full Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              className="w-full px-4 py-2 rounded-lg border border-[#d4a373] focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.userName && (
              <p className="text-red-600 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-[#d4a373] pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Mail className="absolute right-3 top-9 text-yellow-600 w-5 h-5" />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Phone Number</label>
            <div className="flex space-x-2">
              {/* Country Code Dropdown */}
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-1/3 px-3 py-2 rounded-lg border border-[#d4a373] bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="+94">LK +94</option>
                <option value="+91">IN +91</option>
                <option value="+1">US +1</option>
                <option value="+44">GB +44</option>
                <option value="+61">AU +61</option>
                {/* Add more as needed */}
              </select>

              {/* Phone Number Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="712345678"
                autoComplete="tel"
                className="w-full px-4 py-2 rounded-lg border border-[#d4a373] focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-lg border border-[#d4a373] pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-yellow-600 hover:text-yellow-700"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-lg border border-[#d4a373] pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-yellow-600 hover:text-yellow-700"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-[#5a3e2b]">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-700 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}

export default SignUp;