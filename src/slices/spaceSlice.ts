import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SpaceData, VpData } from "src/types"
import { changeMode, getSpaceData, saveSpaceData } from "src/slices/spaceLocalStorage"
import { Mode } from "src/data"

export const setSpaceData = createAsyncThunk<VpData, VpData>(
  "spaceSlice/setSpaceData",
  async (spaceData: VpData, thunkAPI) => {
    try {
      return await saveSpaceData(spaceData)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loadSpaceData = createAsyncThunk<SpaceData, void>(
  "spaceSlice/loadSpaceData",
  async (params: void, thunkAPI) => {
    try {
      return await getSpaceData()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const setMode = createAsyncThunk<number, number>(
  "spaceSlice/setMode",
  async (mode: number, thunkAPI) => {
    try {
      return await changeMode(mode)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)


export interface SpaceState {
  vpData: VpData
  mode: Mode
}
  
const initialState: SpaceState = {
  vpData: {
    xCord: -1, 
    yCord: -1,
    zoomFactor: 1,
  },
  mode: Mode.Add
}
  
const spaceSlice = createSlice({
  name: "spaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSpaceData.fulfilled, (state, action) => {
      state.vpData = action.payload
    }),
    builder.addCase(loadSpaceData.fulfilled, (state, action) => {
      state.vpData = action.payload.vpData
      state.mode = action.payload.mode
    })
    builder.addCase(setMode.fulfilled, (state, action) => {
      state.mode = action.payload
    })
  },
})
  
export default spaceSlice.reducer
  