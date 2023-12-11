import { fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import MainPage from "../pages/MainPage/MainPage"
import { renderWithProviders } from "../utils/test-utils"
import {  Mode, testNotes, testVpData } from "src/data"
import * as redux from "react-redux"

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
    const useDispatchSpy = jest.spyOn(redux, "useDispatch") 
    const mockDispatchFn = jest.fn()        
    useDispatchSpy.mockReturnValue(mockDispatchFn)
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const addButton = screen.getByText("Добавить Заметку")
    fireEvent.click(addButton)
    expect(useDispatchSpy).toHaveBeenCalled()
  })
})
