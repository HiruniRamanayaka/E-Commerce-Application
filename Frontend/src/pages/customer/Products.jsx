import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import api from "../../api";
import { Coffee, Snowflake, Star } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.sizeOptions?.length > 0) {
          setSelectedSize(res.data.sizeOptions[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addToCart({
      product,
      selectedSize,
      quantity: 1
    }));
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading coffee details...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center text-red-600">Product not found or access denied.</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdf8f3] to-[#fbead1] py-12 px-6 text-[#3e2c1d]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Image Section */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-l-3xl md:min-h-[500px] transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fdf8f3] to-transparent rounded-bl-3xl"></div>
        </div>

        {/* Details Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-3">{product.name}</h2>
          <p className="text-base text-[#5a3e2b] mb-5">{product.description}</p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-yellow-700">
              {selectedSize ? `LKR ${selectedSize.price}` : product.price ? `LKR ${product.price}` : "Price not available"}
            </span>
            <div className="flex items-center gap-2 text-yellow-600 text-sm">
              <Star className="w-5 h-5" />
              {product.rating?.rate?.toFixed(1)} / 5
            </div>
          </div>

          <div className="flex gap-4 text-sm text-[#3e2c1d] mb-6">
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

          {product.sizeOptions?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Select Size:</h4>
              <div className="flex gap-3 flex-wrap">
                {product.sizeOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(opt)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      selectedSize?.size === opt.size
                        ? "bg-yellow-600 text-white border-yellow-600"
                        : "bg-white text-yellow-700 border-yellow-400 hover:bg-yellow-500 hover:text-white"
                    }`}
                  >
                    {opt.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.ingredients?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Ingredients:</h4>
              <ul className="list-disc list-inside text-sm text-[#5a3e2b]">
                {product.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {product.allergens?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Allergens:</h4>
              <p className="text-sm text-red-600">{product.allergens.join(", ")}</p>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;