import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { VpData } from "src/types"
import { getSpaceData, saveSpaceData } from "src/slices/spaceLocalStorage"

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

export const loadSpaceData = createAsyncThunk<VpData, void>(
  "spaceSlice/loadSpaceData",
  async (params: void, thunkAPI) => {
    try {
      return await getSpaceData()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export interface SpaceState {
  spaceData: VpData
}
  
const initialState: SpaceState = {
  spaceData: {
    xCord: -1, 
    yCord: -1,
    zoomFactor: 1,
  }
}
  
const spaceSlice = createSlice({
  name: "spaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSpaceData.fulfilled, (state, action) => {
      state.spaceData = action.payload
    }),
    builder.addCase(loadSpaceData.fulfilled, (state, action) => {
      state.spaceData = action.payload
    })
  },
})
  
export default spaceSlice.reducer
  