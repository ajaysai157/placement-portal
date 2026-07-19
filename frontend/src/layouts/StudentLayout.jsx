import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./StudentLayout.css";

function StudentLayout() {
  return (
    <div className="layout">
      <Sidebar role="student" />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;