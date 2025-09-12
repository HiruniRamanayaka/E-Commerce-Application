import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const loadSavedAuth = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("auth"));
    if (saved?.token) {
      try {
        const decoded = jwtDecode(saved.token);
        if (decoded.exp * 1000 > Date.now()) {
          return saved;
        } else {
          localStorage.removeItem("auth");
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }
  } catch {
    // ignore
  }
  return { token: null, user: null };
};

const initialState = (() => {
  const saved = loadSavedAuth();
  return {
    token: saved.token || null,
    user: saved.user || null, // store user object: { id, userName, email, phone, role }
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // persist
      localStorage.setItem("auth", JSON.stringify({ token: action.payload.token, user: action.payload.user }));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
