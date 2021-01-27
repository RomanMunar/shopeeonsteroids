import { ChakraProvider, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import { ItemDisplayView, Layout } from "src/components";
import { closeModal } from "src/slices/ui/UISlice";
import { RootState } from "./rootReducer";
import { AnimatedRoute } from "src/components";
import { Bookmarks } from "./Bookmarks";
import { Main } from "./Main";
import { Search } from "./Search";
import { Settings } from "./Settings";

const routes = [
  { path: "/", element: <Main /> },
  { path: "/search", element: <Search /> },
  { path: "/bookmarks", element: <Bookmarks /> },
  { path: "/settings", element: <Settings /> },
  { path: "/search", element: <Search /> },
];

function App() {
  const { displayModal, modalView } = useSelector((state: RootState) => state.UIReducer);
  const dispatch = useDispatch();

  return (
    <ChakraProvider resetCSS>
      <Modal isOpen={displayModal} onClose={() => dispatch(closeModal())}>
        <ModalOverlay />
        <ModalContent>
          {modalView === "itemDisplay" && (
            <ItemDisplayView onClose={() => dispatch(closeModal())} />
          )}
        </ModalContent>
      </Modal>
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
