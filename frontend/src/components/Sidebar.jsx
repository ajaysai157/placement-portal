import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
  FaPlusCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";

import "./Sidebar.css";

function Sidebar({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());

    localStorage.removeItem("token");

    await persistor.purge();

    toast.success("Logged out successfully!");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Placement Portal</h2>

      <nav>
        {role === "student" ? (
          <>
            <NavLink to="/student/dashboard" className="nav-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/student/jobs" className="nav-link">
              <FaBriefcase />
              <span>Jobs</span>
            </NavLink>

            <NavLink to="/student/applications" className="nav-link">
              <FaClipboardList />
              <span>My Applications</span>
            </NavLink>

            <NavLink to="/student/profile" className="nav-link">
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/recruiter/dashboard" className="nav-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/recruiter/create-job" className="nav-link">
              <FaPlusCircle />
              <span>Create Job</span>
            </NavLink>

            <NavLink to="/recruiter/jobs" className="nav-link">
              <FaBriefcase />
              <span>My Jobs</span>
            </NavLink>

            <NavLink to="/recruiter/profile" className="nav-link">
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;