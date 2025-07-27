// src/features/users/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import { performApiAction, IError } from "../../services/api";
import { toast } from "react-toastify";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IAuthState {
  user: IUser | null;
  registerStatus: "idle" | "pending" | "resolved" | "rejected";
  authStatus: "idle" | "pending" | "resolved" | "rejected";
  authorization: "authenticated" | "unauthenticated";
  errorMessage: string | null;
}

export const register = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    const response = await performApiAction<ILoginResponse>({
      method: "POST",
      url: "/auth/register",
      body: data,
      requiresAuth: false,
    });

    if (!response.success) {
      return rejectWithValue(response.error);
    }

    toast.success("Registration successful!");
    return response.data as ILoginResponse;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    const response = await performApiAction<ILoginResponse>({
      method: "POST",
      url: "/auth/login",
      body: data,
      requiresAuth: false,
    });

    if (!response.success) {
      return rejectWithValue(response.error);
    }

    toast.success("Login successful!");
    return response.data as ILoginResponse;
  }
);

export const init = createAsyncThunk(
  "auth/init",
  async (_, { rejectWithValue }) => {
    const initResponse = await performApiAction({
      method: "GET",
      url: "/auth/init",
      requiresAuth: true,
    });

    if (!initResponse.success) {
      return rejectWithValue(initResponse.error);
    }

    return initResponse.data as ILoginResponse;
  }
);

const initialState: IAuthState = {
  user: null,
  registerStatus: "idle",
  authStatus: "idle",
  authorization: "unauthenticated",
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authStatus = "idle";
      state.authorization = "unauthenticated";
      state.errorMessage = null;
      localStorage.removeItem("TM_ACCESS_KEY");
    },
    setRegisterStatusToIdle: (state) => {
      state.registerStatus = "idle";
    },
  },
  extraReducers(builder) {
    //register
    builder.addCase(register.pending, (state) => {
      state.registerStatus = "pending";
      state.errorMessage = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registerStatus = "resolved";
      state.user = action.payload.user;
      state.authorization = "authenticated";
      localStorage.setItem("TM_ACCESS_KEY", action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      const errorPayload = action.payload as IError;
      state.authorization = "unauthenticated";
      state.registerStatus = "rejected";
      state.errorMessage = errorPayload.message;
    });

    //login
    builder.addCase(login.pending, (state) => {
      state.registerStatus = "pending";
      state.errorMessage = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.registerStatus = "resolved";
      state.user = action.payload.user;
      state.authorization = "authenticated";
      localStorage.setItem("TM_ACCESS_KEY", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      const errorPayload = action.payload as IError;
      state.authorization = "unauthenticated";
      state.registerStatus = "rejected";
      state.errorMessage = errorPayload.message;
    });

    //init
    builder.addCase(init.pending, (state) => {
      state.authStatus = "pending";
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.authStatus = "resolved";
      state.authorization = "authenticated";
      state.user = action.payload.user;
    });
    builder.addCase(init.rejected, (state, action) => {
      const errorPayload = action.payload as IError;
      state.authStatus = "rejected";
      state.authorization = "unauthenticated";
      state.errorMessage = errorPayload.message;
    });
  },
});

export const { logout, setRegisterStatusToIdle } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
