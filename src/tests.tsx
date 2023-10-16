/*import {render, screen} from "@testing-library/react"
// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from "@testing-library/user-event"
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom"
// the component to test
import MainPage from "./pages/MainPage/MainPage"

test("Add note", async () => {
  // ARRANGE
  render(<MainPage />)
  
  // ACT
  await userEvent.click(screen.getByText("Добавить заметку"))
  await screen.findByRole("textarea")
  
  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("")
  expect(screen.getByRole("button")).toBeDisabled()
})*/