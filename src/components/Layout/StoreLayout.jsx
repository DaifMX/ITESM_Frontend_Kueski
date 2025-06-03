import NavBar from "../StoreNavbar/NavBar";
import { Outlet } from "react-router";

export default function StoreLayout() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}