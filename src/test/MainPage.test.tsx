import { fireEvent, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import "@testing-library/jest-dom"
import MainPage from "../pages/MainPage/MainPage"
import { renderWithProviders } from "../utils/test-utils"
import { Mode, testNotes, testVpData } from "src/data"

const defaultState = {
  note: {
    Notes: testNotes,
  },
  space: {
    vpData: testVpData,
    mode: Mode.Add,
  },
}

describe("Main page tests", () => {
  it("should coontain header buttons", () => {
    renderWithProviders(<MainPage />, {
      preloadedState: defaultState,
    })
    const addButton = screen.getByText("Добавить Заметку")
    const moveButton = screen.getByText("Режим перемещения")
    const removeButton = screen.getByText("Очистить")
    expect(addButton).toBeInTheDocument()
    expect(moveButton).toBeInTheDocument()
    expect(removeButton).toBeInTheDocument()
  })
  it("clear button should clear notes", async () => {
    act(() => {
      renderWithProviders(<MainPage />, {
        preloadedState: defaultState,
      })
    })
    const clearButton = screen.getByText("Очистить")
    const note = screen.getByText("Test1")
    act(() => {
      fireEvent.click(clearButton)
    })
    await waitFor(() => expect(note).not.toBeInTheDocument())
  })
  it("while in add mode clicking on screen should add note", async () => {
    act(() => {
      renderWithProviders(<MainPage />, {
        preloadedState: defaultState,
      })
    })
    const space = screen.getByTestId("space")
    act(() => {
      fireEvent.click(space)
    })
    await waitFor(() => expect(screen.getByText("")).toBeInTheDocument())
  })
})
