import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder } from "../../features/order/orderSlice";
import { ShoppingBag } from "lucide-react";

const Orders = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl text-[#3e2c1d] font-bold mb-4">My Orders</h2>

      {status === "loading" && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
          <ShoppingBag className="w-12 h-12 mb-4 text-amber-600" />
          <h3 className="text-xl font-semibold mb-2">You haven’t placed any orders yet</h3>
          <p className="mb-4">Browse our coffees and place your first order to see it here.</p>
          <a
            href="/coffees"
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            Explore Coffees
          </a>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Pickup Time</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.quantity} × {item.product.name}
                      {item.selectedSize?.size && ` (${item.selectedSize.size})`}
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  {order.pickupTime || "—"}
                </td>
                <td className="border px-4 py-2">LKR {" "} {order.totalPrice}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded capitalize font-medium ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "paid"
                        ? "text-blue-500"
                        : order.status === "completed"
                        ? "text-green-500"
                        : order.status === "ready"
                        ? "text-purple-500"
                        : order.status === "cancelled"
                        ? "text-gray-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {["pending", "paid"].includes(order.status) ? (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;