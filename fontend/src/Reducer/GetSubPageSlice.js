import { createSlice } from "@reduxjs/toolkit";

export const GetSubPageSlice = createSlice({
  name: "subpage",
  initialState: {
    subpage: {
      isfetching: false,
      item: null,
      error: false,
    },
  },
  reducers: {
    subpageStart: (state) => {
      state.subpage.isfetching = true;
    },
    subpageSuccess: (state, action) => {
      state.subpage.isfetching = false;
      state.subpage.item = action.payload;
      state.subpage.error = false;
    },
    subpageFault: (state) => {
      state.subpage.isfetching = false;
      state.subpage.error = true;
    },
  },
});

export const { subpageStart, subpageSuccess, subpageFault } =
  GetSubPageSlice.actions;

export default GetSubPageSlice.reducer;
