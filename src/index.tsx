import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { makeServer } from "./server"

const environment = process.env.NODE_ENV

if (environment !== "production") {
  makeServer({ environment })
}

const render = () => {
  const App = require("./App/App").default

  ReactDOM.render(<App />, document.getElementById("root"))
}

render()

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App/App", render)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
