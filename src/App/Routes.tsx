import { ReactNode } from "react";
import { Route, Routes as RoutesLib } from "react-router-dom";
import { Main } from "./Main";
import { Search } from "./Search";
import { Settings } from "./Settings";
import { Bookmarks } from "./Bookmarks";

const withLayout = (Component: any & { Layout?: string }) => {
  const Noop: ReactNode = ({ children }: { children: ReactNode }) => children;
  const Layout = (Component as any).Layout || Noop;

  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export const Routes = () => (
  <RoutesLib>
    <Route path="/" element={withLayout(Main)} />
    <Route path="/search" element={withLayout(Search)} />
    <Route path="/bookmarks" element={withLayout(Bookmarks)} />
    <Route path="/settings" element={withLayout(Settings)} />
    <Route path="/search" element={withLayout(Search)} />
  </RoutesLib>
);
