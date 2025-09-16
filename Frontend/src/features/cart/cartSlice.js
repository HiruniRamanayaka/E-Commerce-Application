import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await api.get("/cart");
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity, selectedSize }) => {
    const res = await api.post("/cart/add", {
      productId: product._id,
      quantity,
      selectedSize
    });
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const res = await api.delete(`/cart/remove/${productId}`);
    return res.data;
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ productId, selectedSize }) => {
    const res = await api.post("/cart/increase", { productId, selectedSize });
    // console.log("Dispatching increaseQuantity:", productId, selectedSize);
    return res.data;
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ productId, selectedSize }) => {
    const res = await api.post("/cart/decrease", { productId, selectedSize });
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
        },
      });

export default cartSlice.reducer;