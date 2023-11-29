import { configureStore } from "@reduxjs/toolkit"
import noteReducer from "src/slices/noteSlice"
import spaceReducer from "src/slices/spaceSlice"

export const store = configureStore({
  reducer: {
    note: noteReducer,
    space: spaceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
