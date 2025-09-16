import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

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
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {status === "loading" && <p>Loading cart...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={item.product._id + (item.selectedSize?.size || "") + i}
              className="flex items-center justify-between border-b pb-2"
            >
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
                      Size: <span className="font-medium">{item.selectedSize.size}</span>
                    </p>
                  )}
                  <p>
                    {item.quantity} ×{" "}
                    {item.selectedSize?.price ?? item.product.price} LKR
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: {totalPrice} LKR</h3>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;