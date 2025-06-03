import NavBar from "../components/StoreNavbar/NavBar";
import { Outlet } from "react-router";

export default function StoreLayout() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}