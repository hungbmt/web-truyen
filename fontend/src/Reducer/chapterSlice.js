import { createSlice } from "@reduxjs/toolkit";

export const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapter: {
      isfetching: false,
      item: null,
      error: false,
    },
  },
  reducers: {
    chapterStart: (state) => {
      state.chapter.isfetching = true;
    },
    chapterSuccess: (state, action) => {
      state.chapter.isfetching = false;
      state.chapter.item = action.payload;
      state.chapter.error = false;
    },
    chapterFault: (state) => {
      state.chapter.isfetching = false;
      state.chapter.error = true;
    },
  },
});

export const { chapterStart, chapterSuccess, chapterFault } =
  chapterSlice.actions;

export default chapterSlice.reducer;
