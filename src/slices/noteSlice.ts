import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit" 
import { NoteData } from "src/types"
import { loadNotes, popNote, pushNote, saveNote } from "src/slices/noteLocalStorage"
  
export const setNoteData = createAsyncThunk<NoteData[], NoteData>(
  "NoteSlices/setNoteData",
  async (NoteData: NoteData, thunkAPI) => {
    try {
      return await saveNote(NoteData)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const addNote = createAsyncThunk<NoteData[], void>(
  "NoteSlices/addNote",
  async (params: void, thunkAPI) => {
    try {
      return await pushNote()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loadNoteData = createAsyncThunk<NoteData[], void>(
  "NoteSlices/loadNoteData",
  async (params: void, thunkAPI) => {
    try {
      return await loadNotes()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const deleteNote = createAsyncThunk<NoteData[], number>(
  "NoteSlices/deleteNote",
  async (id: number, thunkAPI) => {
    try {
      return await popNote(id)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export interface NotesState {
  Notes: NoteData[]
}
  
const initialState: NotesState = {
  Notes: []
}
  
const noteSlice = createSlice({
  name: "noteSlices",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(setNoteData.fulfilled, (state, action) => {
      state.Notes = action.payload
    }),
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.Notes = action.payload
    }),
    builder.addCase(loadNoteData.fulfilled, (state, action) => {
      state.Notes = action.payload
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.Notes = action.payload
    })
  },
})
  
export default noteSlice.reducer