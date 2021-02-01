import { AnimatePresence } from "framer-motion";
import { Route, useMatch, useResolvedPath } from "react-router-dom";
import { MotionBox } from ".";

interface Props {
  element: JSX.Element;
  path: string;
}

const animatedRoute = ({ path, element }: Props) => {
  const resolvedPath = useResolvedPath(path);
  const match = useMatch(resolvedPath.pathname);

  return (
    <AnimatePresence>
      {match && (
        <MotionBox
        // initial={{ x: "-100vh" }}
        // animate={{ x: 0 }}
        // exit={{ x: "100vh" }} // @ts-ignore
        // transition={{ type: "just", duration: 0.4 }}
        >
          <Route path={path} element={element} />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default animatedRoute;
