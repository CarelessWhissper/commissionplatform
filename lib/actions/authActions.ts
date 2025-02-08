import { AppDispatch } from "../store";
import { loginSuccess,logout } from "../slices/authSlice";
import {message} from "antd";


export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
  
      // Dispatch login success action
      dispatch(loginSuccess({ token: data.token, user: data.user }));
  
      // Show success toast
      message.success("Login successful! Redirecting...", 2);
  
      return data; 
    } catch (error: any) {
      message.error(error.message || "Invalid email or password!");
      throw error;  // rethrow error so that component can handle it
    }
  };
  
  export const logoutUser = () => (dispatch: AppDispatch) => {
    dispatch(logout());
    message.info("Logged out successfully");
  };