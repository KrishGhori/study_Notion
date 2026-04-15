import { createSlice } from "@reduxjs/toolkit";

const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) return null;

  if (storedToken === "undefined" || storedToken === "null") {
    return null;
  }

  try {
    // Supports previously JSON-stringified token values.
    const parsedToken = JSON.parse(storedToken);
    return parsedToken ?? null;
  } catch {
    // Falls back to raw JWT strings stored directly in localStorage.
    return storedToken;
  }
};

const initialState = {
  signupData: null,
  loading: false,
  token: getStoredToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;