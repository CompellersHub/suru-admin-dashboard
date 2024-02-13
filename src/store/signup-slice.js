import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signUp",
  initialState: { name: null, email: null, exists: false },
  reducers: {
    setSignup(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.exists = action.payload.exists;
    },
  },
});

export const signUpAction = signupSlice.actions;
export default signupSlice;
