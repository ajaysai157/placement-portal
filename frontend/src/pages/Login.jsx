import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/slices/authSlice";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      localStorage.setItem("token", response.token);
      
      if (response.user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Login to continue to your placement portal.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
