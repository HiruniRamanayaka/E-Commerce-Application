import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = items.reduce((sum, item) => {
    const price = item.selectedSize?.price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl text-[#3e2c1d] font-bold mb-4">🛒 Your Cart</h2>

      {status === "loading" && <p>Loading cart...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
          <ShoppingCart className="w-12 h-12 mb-4 text-amber-600" />
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="mb-4">Browse our coffees and add your favorites to the cart.</p>
          <button
            onClick={() => navigate("/coffees")}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            Explore Coffees
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={item.product._id + (item.selectedSize?.size || "") + i}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Left: Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  {item.selectedSize?.size && (
                    <p className="text-sm text-gray-600">
                      Size:{" "}
                      <span className="font-medium">
                        {item.selectedSize.size}
                      </span>
                    </p>
                  )}
                  <p>
                    {item.quantity} ×{" "}
                    {item.selectedSize?.price ?? item.product.price} LKR
                  </p>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity({
                      productId: item.product._id,
                      selectedSize: item.selectedSize
                      }))
                    }
                    disabled={item.quantity <= 1}
                    className={`p-2 rounded ${
                      item.quantity <= 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="px-2 font-medium">{item.quantity}</span>
                  
                  <button
                    onClick={() =>
                      dispatch(increaseQuantity({
                        productId: item.product._id,
                        selectedSize: item.selectedSize
                      }))
                    }
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {/* Right: Remove Button */}
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
              </div>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: {totalPrice} LKR</h3>
            <button 
              onClick={() => navigate("/customer/checkout")}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;