import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./nav-slice";
import authSlice from "./auth-slice";
import signupSlice from "./signup-slice";

const store = configureStore({
  reducer: {
    signUp: signupSlice.reducer,
    nav: navSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
