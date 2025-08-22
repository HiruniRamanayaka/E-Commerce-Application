import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
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

      {/* Login Card */}
      <div className="relative z-10 bg-white/80 rounded-2xl shadow-2xl border border-yellow-100 p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 text-yellow-700 hover:text-yellow-900 text-2xl font-bold"
          aria-label="Close Login"
        >
          <X />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#3e2c1d] text-center mb-6">Welcome Back</h2>
        <p className="text-sm text-[#5a3e2b] text-center mb-8">
          Log in to explore our brews and blends
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-[#d4a373] focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-[#5a3e2b]">
          Don’t have an account?{" "}
          <a href="/signUp" className="text-yellow-700 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;