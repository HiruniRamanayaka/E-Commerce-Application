import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeOrder({ phoneNumber, pickupTime, paymentMethod }))
      .then(() => {
      dispatch(clearCart()); 
      navigate("/customer/orders");
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{10}"
            placeholder="07XXXXXXXX"
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">We may contact you if needed</p>
        </div>

        <div>
          <label className="block font-medium">Preferred Pickup Time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Pickup available between 8:00 AM – 8:00 PM</p>
        </div>

        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="cod">Pay at Counter (Cash)</option>
            <option value="card">Pay at Counter (Card)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;