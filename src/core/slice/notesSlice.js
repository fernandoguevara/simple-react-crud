import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as NotesAPI from "../api/notesAPI";

const initialState = {
  notes: [],
  status: 'idle',
  error: null,
  dialogOpened: false
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = await NotesAPI.getNotes();
    return response.data;
});

export const addNewNote = createAsyncThunk(
    'notes/addNewNote',
    async initialNote => {
      const response = await NotesAPI.createNote(initialNote);
      return response.data;
    }
  )

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    openDialogNote(state, action) {
      state.dialogOpened = action.payload;
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notes = state.notes.concat(action.payload);
      state.dialogOpened = false;
    },
    [fetchNotes.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewNote.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addNewNote.fulfilled]: (state, action) => {
      state.notes.push(action.payload);
    },
    [addNewNote.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  }
})

export const { openDialogNote } = notesSlice.actions;

export default notesSlice.reducer;

export const selectAllNotes = state => state.notes.notes;

export const selectError = state => state.notes.error;

export const selectDialog = state => state.notes.dialogOpened;

