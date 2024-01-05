import React from "react"
import ReactDOM from "react-dom/client"
import App from "src/App"
import { store } from "src/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement || document.createElement("div")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
