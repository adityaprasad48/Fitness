import { createSlice } from "@reduxjs/toolkit";

const entrySlice = createSlice({
  name: "entry",
  initialState: {},
  reducers: {
    receiveEntries: (state, action) => {
      return {
        ...action.payload.entries,
      };
    },
    addEntry: (state, action) => {
      console.log("addEntry called");
      return {
        ...action.payload.entry,
      };
    },
  },
});

export default entrySlice.reducer;

export const { receiveEntries, addEntry } = entrySlice.actions;

export const selectEntries = (state) => state.entries;
