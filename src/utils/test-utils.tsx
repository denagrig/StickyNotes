import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import noteReducer from "src/slices/noteSlice"
import spaceReducer from "src/slices/spaceSlice"

import type { AppStore, RootState } from "../store"
import {  Mode, testNotes, testVpData } from "src/data"
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      note: {
        Notes: testNotes
      },
      space: {
        vpData: testVpData,
        mode: Mode.Add
      }
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        note: noteReducer,
        space: spaceReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
