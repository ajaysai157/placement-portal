import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RegisterImage from "../assets/register.svg";

import { register } from "../services/authService";

import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        name,
        email,
        password,
        role,
      });

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      <div className="login-left fade-up">

        <span className="login-tag">
          🎯 Join Placement Portal
        </span>

        <h1>
          Start Your
          <br />
          Career Journey
        </h1>

        <p>
          Create your account to apply for jobs,
          upload your resume, connect with recruiters,
          and build your professional future.
        </p>

        <img
          src={RegisterImage}
          alt="Register Illustration"
          className="login-illustration"
        />

      </div>

      <AuthCard
        title="Create Account 🚀"
        subtitle="Register to get started."
      >

        <form onSubmit={handleSubmit}>

          <AuthInput
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <div className="input-group">

            <label>Register As</label>

            <select
              className="role-select"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option value="student">
                Student
              </option>

              <option value="recruiter">
                Recruiter
              </option>

            </select>

          </div>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="register-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </AuthCard>

    </section>
  );
}

export default Register;