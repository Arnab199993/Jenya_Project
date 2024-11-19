import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface AuthState {
  accessToken: string | null;
  user: AuthResponse["user"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  AuthResponse,
  { username: string; password: string }
>("auth/fetchUsers", async (userDetails) => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userDetails.username,
      password: userDetails.password,
      expiresInMins: 30,
    }),
    // credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  return await response.json();
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export default AuthSlice.reducer;
