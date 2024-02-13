import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userToken: null, type: null },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.userToken = action.payload.userToken;
      state.type = action.payload.type;
    },

    logout(state) {
      state.user = null;
      state.userToken = null;
      state.type = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
