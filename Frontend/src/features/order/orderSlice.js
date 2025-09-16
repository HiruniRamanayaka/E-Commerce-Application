import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await api.get("/orders");
  return res.data;
});

export const placeOrder = createAsyncThunk("orders/placeOrder", async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
});

export const cancelOrder = createAsyncThunk("orders/cancelOrder", async (orderId) => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data.order;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((o) => o._id === updated._id);
        if (index !== -1) state.list[index] = updated;
      })
  },
});

export default orderSlice.reducer;