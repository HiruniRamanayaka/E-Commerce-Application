import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "colored",
      });

      setTimeout(() => {
        if (user.role === "customer") {
          navigate("/customer/dashboard"); // Customer dashboard
        } else {
          toast.error("This login is meant for customers. If you're an admin, please use the admin portal.");
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login failed", {
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
        <div className="absolute inset-0 z-0">
          <img
            src="/coffee-bg.jpg"
            alt="Coffee background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        </div>

        <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl border border-yellow-100 p-8 w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 text-yellow-700 hover:text-yellow-900 text-2xl font-bold"
            aria-label="Close Login"
          >
            <X />
          </button>

          <h2 className="text-4xl font-bold text-[#3e2c1d] text-center mb-4 pt-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-[#5a3e2b] text-center mb-6 italic">
            Log in to explore our brews and blends
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-2 rounded-lg border border-[#d4a373] focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
                autoComplete="current-password"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-md"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#5a3e2b]">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-yellow-700 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;