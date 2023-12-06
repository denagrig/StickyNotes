import { PreloadedState, configureStore } from "@reduxjs/toolkit"
import noteReducer from "src/slices/noteSlice"
import spaceReducer from "src/slices/spaceSlice"

export const store = configureStore({
  reducer: {
    note: noteReducer,
    space: spaceReducer,
  },
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      note: noteReducer,
      space: spaceReducer,
    },
    preloadedState
  })
}


export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
