import { screen } from "@testing-library/react"
import MainPage from "../pages/MainPage/MainPage"
import { renderWithProviders } from "../utils/test-utils"
import {  testNotes, testVpData } from "src/data"
//import { Provider } from "react-redux"
//import configureStore from "redux-mock-store"
/*const initialState = {
  note: [ {notes:
    {
      id: 1,
      xCord: "0px",
      yCord: "0px",
      height: "300px",
      width: "300px",
      text: "",
      fontSize: 24,
      color: "green",
    },
  }
  ],
  space: [{
    vpData: {
      xCord: 1,
      yCord: 1,
      zoomFactor: 1,
    },
    mode: 1,
  }
  ],
}*/

describe("App tests", () => {
  it("should contains the heading 1", () => {
    //const mockStore = configureStore()
    // let store = mockStore(initialState)
    renderWithProviders(
      <MainPage />, {
        preloadedState: {
          note: {
            Notes: testNotes
          },
          space: {
            vpData: testVpData,
            mode: 1
          }
        }
      }
    )
    const heading = screen.getByText(/ Добавить Заметку/i)
    expect(heading).toBeInTheDocument()
  })
})
