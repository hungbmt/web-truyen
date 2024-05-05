import { createSlice } from "@reduxjs/toolkit";

export const getHomeSlice = createSlice({
  name: "getHome",
  initialState: {
    getHome: {
      isfetching: false,
      item: null,
      error: false,
    },
  },
  reducers: {
    getHomeStart: (state) => {
      state.getHome.isfetching = true;
    },
    getHomeSuccess: (state, action) => {
      state.getHome.isfetching = false;
      state.getHome.item = action.payload;
      state.getHome.error = false;
    },
    getHomeFault: (state) => {
      state.getHome.isfetching = false;
      state.getHome.error = true;
    },
  },
});

export const { getHomeStart, getHomeSuccess, getHomeFault } =
  getHomeSlice.actions;

export default getHomeSlice.reducer;
