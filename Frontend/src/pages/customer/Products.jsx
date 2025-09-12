import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";
import { useSelector } from "react-redux";
import { Coffee, Snowflake, Star } from "lucide-react";
import { jwtDecode } from "jwt-decode";

function ProductDetail() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect if no token or expired
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("auth");
        navigate("/login");
        return;
      }
    } catch {
      localStorage.removeItem("auth");
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);
  
  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading coffee details...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center text-red-600">Product not found or access denied.</div>;
  }

  return (
    <section className="min-h-screen bg-[#fdf8f3] py-10 px-6 text-[#3e2c1d]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-t-2xl" />
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-[#5a3e2b] mb-4">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-yellow-700">LKR {product.price}</span>
            <div className="flex items-center gap-2 text-yellow-600 text-sm">
              <Star className="w-4 h-4" />
              {product.rating?.rate?.toFixed(1)} / 5
            </div>
          </div>

          <div className="flex gap-4 text-sm text-[#3e2c1d]">
            {product.category?.hot && (
              <span className="flex items-center gap-1">
                <Coffee className="w-4 h-4" /> Hot
              </span>
            )}
            {product.category?.cold && (
              <span className="flex items-center gap-1">
                <Snowflake className="w-4 h-4" /> Cold
              </span>
            )}
          </div>

          <div className="mt-6">
            <button className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;