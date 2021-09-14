import { createSlice } from '@reduxjs/toolkit';
import { Auth } from "../utils/utils";

const auth: Auth = { user: null, token: null };

const initialState = {
  auth
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setToken(state, action) {
      state.auth.token = action.payload;
    },
    setUser(state, action) {
      state.auth.user = action.payload;
    },
    clearAuth(state) {
      state.auth.user = null;
      state.auth.token = null;
    }
  }
});



export default authSlice.reducer;

export const { setToken, setUser, clearAuth, setAuth } = authSlice.actions;
