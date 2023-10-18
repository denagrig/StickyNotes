import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CordsPair, NoteData } from "src/types"
import {
  clearAllNotes,
  loadNotes,
  popNote,
  pushNote,
  saveNote,
} from "src/slices/noteLocalStorage"

export const setNoteData = createAsyncThunk<NoteData[], NoteData>(
  "noteSlice/setNoteData",
  async (noteData: NoteData, thunkAPI) => {
    try {
      return await saveNote(noteData)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const addNote = createAsyncThunk<NoteData[], CordsPair>(
  "noteSlice/addNote",
  async (cords: CordsPair, thunkAPI) => {
    try {
      return await pushNote(cords)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loadNoteData = createAsyncThunk<NoteData[], void>(
  "noteSlice/loadNoteData",
  async (params: void, thunkAPI) => {
    try {
      return await loadNotes()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const deleteNote = createAsyncThunk<NoteData[], number>(
  "noteSlice/deleteNote",
  async (id: number, thunkAPI) => {
    try {
      return await popNote(id)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const clearNotes = createAsyncThunk<NoteData[], void>(
  "noteSlice/clearNotes",
  async (params: void, thunkAPI) => {
    try {
      return await clearAllNotes()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export interface NotesState {
  Notes: NoteData[];
}

const initialState: NotesState = {
  Notes: [],
}

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setNoteData.fulfilled, (state, action) => {
      state.Notes = action.payload
    }),
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.Notes = action.payload
    }),
    builder.addCase(loadNoteData.fulfilled, (state, action) => {
      state.Notes = action.payload
    }),
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.Notes = action.payload
    })
    builder.addCase(clearNotes.fulfilled, (state, action) => {
      state.Notes = action.payload
    })
  },
})

export default noteSlice.reducer
