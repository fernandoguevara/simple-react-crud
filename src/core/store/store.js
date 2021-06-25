import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "../slice/notesSlice";

export default configureStore({
  reducer: {
    notes: notesReducer
  }
});