import { Route, Routes as RoutesLib } from "react-router-dom"
import { Main } from "./Main"

export const Routes = () => (
  <RoutesLib>
    <Route path="/" element={<Main />} />
  </RoutesLib>
)
