import { fireEvent, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import MainPage from "../pages/MainPage/MainPage"
import { renderWithProviders } from "../utils/test-utils"
import {  Mode, testNotes, testVpData } from "src/data"
import * as spaceSlice from "src/slices/spaceSlice"
import * as noteSlice from "src/slices/noteSlice"
//import * as redux from "react-redux"

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}))

const defaultState = {
  note: {
    Notes: testNotes
  },
  space: {
    vpData: testVpData,
    mode: Mode.Move
  }
}

describe("Main page tests tests", () => {
  it("should contains the add button", () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const addButton = screen.getByText("Добавить Заметку")
    expect(addButton).toBeInTheDocument()
  })
  it("add button should change mode", () => {
    const changeModeSpy = jest.spyOn(spaceSlice, "setMode") 
    const mockDispatchFn = jest.fn()        
    changeModeSpy.mockReturnValue(mockDispatchFn)
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const addButton = screen.getByText("Добавить Заметку")
    fireEvent.click(addButton)
    expect(changeModeSpy).toHaveBeenCalled()
  })
  it("while in add mode click should add note", async () => {
    const addNoteSpy = jest.spyOn(noteSlice, "addNote") 
    const mockDispatchFn = jest.fn()        
    addNoteSpy.mockReturnValue(mockDispatchFn)
    defaultState.space.mode = Mode.Add
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const space = screen.getByTestId("space")
    fireEvent.click(space)
    await waitFor(() => expect(addNoteSpy).toHaveBeenCalled())
  })
})
