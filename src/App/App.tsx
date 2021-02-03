import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { AnimatedRoute, Layout } from "src/components";
import { Bookmarks } from "./Bookmarks";
import { Main } from "./Main";
import { Search } from "./Search";
import { Settings } from "./Settings";

const routes = [
  { path: "/", element: <Main /> },
  { path: "/search", element: <Search /> },
  { path: "/bookmarks", element: <Bookmarks /> },
  { path: "/settings", element: <Settings /> },
];

function App() {
  return (
    <ChakraProvider resetCSS>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map(({ path, element }) => (
              <AnimatedRoute key={path} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
