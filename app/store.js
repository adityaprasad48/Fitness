import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../features/entries";

export default configureStore({
  reducer: {
    entries: entryReducer,
  },
});
