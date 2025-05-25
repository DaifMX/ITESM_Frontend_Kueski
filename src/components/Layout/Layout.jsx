import NavBar from "../Navbar/NavBar";
import { Outlet } from "react-router";

export default function Layout() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}