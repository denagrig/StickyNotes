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

const useDispatchSpy = jest.spyOn(redux, "useDispatch") 
const mockDispatchFn = jest.fn()        
useDispatchSpy.mockReturnValue(mockDispatchFn)

describe("Main page tests", () => {
  it("should coontain header buttons", () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const addButton = screen.getByText("Добавить Заметку")
    const moveButton = screen.getByText("Режим перемещения")
    const removeButton = screen.getByText("Очистить")
    expect(addButton).toBeInTheDocument()
    expect(moveButton).toBeInTheDocument()
    expect(removeButton).toBeInTheDocument()
  })
  it("clicking mode buttons should change mode", () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const addButton = screen.getByText("Добавить Заметку")
    fireEvent.click(addButton)
    expect(useDispatchSpy).toHaveBeenCalled()
    const moveButton = screen.getByText("Режим перемещения")
    fireEvent.click(moveButton)
    expect(useDispatchSpy).toHaveBeenCalled()
  })
  it("clear button should clear notes", () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const clearButton = screen.getByText("Очистить")
    fireEvent.click(clearButton)
    expect(useDispatchSpy).toHaveBeenCalled()
  })
  it("while in add mode click should add note", async () => {
    defaultState.space.mode = Mode.Add
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const space = screen.getByTestId("space")
    fireEvent.click(space)
    expect(useDispatchSpy).toHaveBeenCalled()
  })	  
  it("clicking on note and changing text should save changes", async () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const note = screen.getByDisplayValue("Test")
    fireEvent.change(note, { target: { value: "a" }})
    expect(useDispatchSpy).toHaveBeenCalled()
    expect((note as HTMLInputElement).value).toEqual("a")
  })	
  it("moving canvas and zooming should save changes", async () => {
    renderWithProviders(
      <MainPage />, {
        preloadedState: defaultState
      }
    )
    const space = screen.getByTestId("space")
    fireEvent.drag(space, {
      delta: {x: 100, y: 0},
    })
    expect(useDispatchSpy).toHaveBeenCalled()
    fireEvent.scroll(space)
    expect(useDispatchSpy).toHaveBeenCalled()
  })	
})