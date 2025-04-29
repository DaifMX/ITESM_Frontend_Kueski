import NavBar from "../Navbar/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}