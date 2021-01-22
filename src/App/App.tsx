import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { Routes } from "./Routes"
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider resetCSS>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
