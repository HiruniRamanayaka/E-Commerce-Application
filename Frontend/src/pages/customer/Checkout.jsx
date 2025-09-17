import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      (item.selectedSize?.price ?? item.product.price) * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeOrder({ items, phoneNumber, pickupTime, paymentMethod, totalPrice }))
      .then(() => {
        toast.success("Order placed successfully!");
        setTimeout(() => {
          dispatch(clearCart());
          navigate("/customer/orders");
        }, 1500);
      })
      .catch(() => {
        toast.error("Failed to place order. Please try again.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} />
      <h2 className="text-3xl font-bold text-[#3e2c1d] mb-6">Confirm Your Order</h2>
      
      {/* Order Summary */}
      <div className="mb-6 rounded-xl p-4 bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">🧾 Order Summary</h3>
        <ul className="divide-y divide-gray-200">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between py-2 text-sm text-gray-700">
              <span>
                {item.product.name} {item.selectedSize?.size && `(${item.selectedSize.size})`} × {item.quantity}
              </span>
              <span className="font-medium text-gray-900">
                {(item.selectedSize?.price ?? item.product.price) * item.quantity} LKR
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold text-lg text-[#3e2c1d]">
          Total: {totalPrice} LKR
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{10}"
            placeholder="07XXXXXXXX"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-sm text-gray-500 mt-1">We may contact you if needed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Preferred Pickup Time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-sm text-gray-500 mt-1">Pickup available between 8:00 AM – 8:00 PM on weekdays</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#3e2c1d] mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="cod">💵 Pay at Counter (Cash)</option>
            <option value="card">💳 Pay at Counter (Card)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
        >
          <span>Place Order</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Checkout;