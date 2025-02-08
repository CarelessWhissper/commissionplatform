import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: { email: string; role: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 }); // Store token for 7 days
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
