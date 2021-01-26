import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "src/components";
import { fetchSearch } from "src/slices/search/searchSlice";
import { RootState } from "../rootReducer";

const Main = () => {
  const items = useSelector((state: RootState) => state.searchReducer.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearch());
  }, []);

  return (
    <div>
      <span>HEYLLOO</span>
      <pre>Hey{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
};

Main.Layout = Layout;

export default Main;
