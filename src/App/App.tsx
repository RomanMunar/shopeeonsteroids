import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <ChakraProvider resetCSS>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
