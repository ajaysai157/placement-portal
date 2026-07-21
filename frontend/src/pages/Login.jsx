import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { login } from "../services/authService";
import { loginSuccess } from "../redux/slices/authSlice";

import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      localStorage.setItem("token", response.token);

      toast.success("Welcome Back 🎉");

      if (response.user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-left fade-up">
        <span className="login-tag">🚀 Placement Portal</span>

        <h1>
          Build Your Future
          <br />
          With Top Companies
        </h1>

        <p>
          Discover internships and jobs from leading companies, upload your
          resume, and manage all your applications from one powerful platform.
        </p>

        <img
          src="https://illustrations.popsy.co/blue/freelancer.svg"
          alt="hero"
          className="login-illustration"
        />
      </div>

      <AuthCard
        title="Welcome Back 👋"
        subtitle="Login to continue your journey."
      >
        <form onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </AuthCard>
    </section>
  );
}

export default Login;
