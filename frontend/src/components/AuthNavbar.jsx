import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa";
import "./AuthNavbar.css";

function AuthNavbar() {
  return (
    <header className="auth-navbar">

      <Link to="/" className="auth-logo">

        <FaGraduationCap />

        <span>Placement Portal</span>

      </Link>

      <Link to="/" className="back-home">

        <FaArrowLeft />

        <span>Back to Home</span>

      </Link>

    </header>
  );
}

export default AuthNavbar;