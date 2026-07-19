import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log({
    isAuthenticated,
    user,
  });

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    return <Navigate to="/recruiter/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
