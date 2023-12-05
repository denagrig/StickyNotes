import { render, screen } from "@testing-library/react"
//import App from "../App"
import MainPage from "src/pages/MainPage/MainPage.tsx"

describe("App tests", () => {
  it("should contains the heading 1", () => {
    render(<MainPage />, {root: "div"})
    const heading = screen.getByText(/ Добавить Заметку/i)
    expect(heading).toBeInTheDocument()
  })
})
