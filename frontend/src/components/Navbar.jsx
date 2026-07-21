import { NavLink, Link } from "react-router-dom";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <FaGraduationCap className="logo-icon" />
          <span>Placement Portal</span>
        </Link>

        <nav className="navbar-menu">

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/jobs">
            Jobs
          </NavLink>

          <a href="#companies">Companies</a>

          <a href="#how-it-works">How It Works</a>

          <a href="#testimonials">Testimonials</a>

        </nav>

        <div className="navbar-actions">

          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="register-link">
            Register
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;