import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder } from "../../features/order/orderSlice";

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
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {status === "loading" && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
                {order.items.map((item) => (
                  <div key={item.product._id}>
                    {item.quantity} × {item.product.name}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {order.pickupTime || "—"}
              </td>
              <td className="border px-4 py-2">LKR {" "} {order.totalPrice}</td>
              <td className="border px-4 py-2 capitalize">{order.status}</td>
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
    </div>
  );
};

export default Orders;