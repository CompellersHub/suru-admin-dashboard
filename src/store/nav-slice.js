import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: { nav: "dashboard" },
  reducers: {
    setNav(state, action) {
      state.nav = action.payload.nav;
    },
  },
});

export const navAction = navSlice.actions;
export default navSlice;
