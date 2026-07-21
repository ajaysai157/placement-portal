import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-content">

          <span className="hero-badge">
            🚀 India's Modern Placement Portal
          </span>

          <h1>
            Launch Your Career
            <br />
            With Top Companies
          </h1>

          <p>
            Discover internships and full-time opportunities,
            connect with recruiters, build your profile, and
            track every application from one platform.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="hero-primary">

              Get Started

              <FaArrowRight />

            </Link>

            <Link to="/jobs" className="hero-secondary">

              Browse Jobs

            </Link>

          </div>

          <div className="hero-stats">

            <div className="stat-card">

              <FaUsers />

              <h2>2500+</h2>

              <p>Students</p>

            </div>

            <div className="stat-card">

              <FaBriefcase />

              <h2>800+</h2>

              <p>Jobs</p>

            </div>

            <div className="stat-card">

              <FaBuilding />

              <h2>150+</h2>

              <p>Companies</p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="hero-glass">

            <h3>

              <FaCheckCircle />

              Latest Placement

            </h3>

            <div className="placement-card">

              <h2>ML Engineer</h2>

              <p>Amazon</p>

              <span>₹18 LPA</span>

            </div>

            <div className="placement-card">

              <h2>Frontend Developer</h2>

              <p>Microsoft</p>

              <span>₹14 LPA</span>

            </div>

            <div className="placement-card">

              <h2>Software Engineer</h2>

              <p>Google</p>

              <span>₹22 LPA</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;