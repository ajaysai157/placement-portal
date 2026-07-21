import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

function AuthLayout() {
  return (
    <>
      <AuthNavbar />

      <Outlet />
    </>
  );
}

export default AuthLayout;