import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./RecruiterLayout.css";

function RecruiterLayout() {
  return (
    <div className="layout">
      <Sidebar role="recruiter" />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default RecruiterLayout;