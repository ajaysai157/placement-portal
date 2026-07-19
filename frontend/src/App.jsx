import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import StudentLayout from "./layouts/StudentLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";

import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";
import RecruiterJobs from "./pages/RecruiterJobs";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Recruiter */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="create-job" element={<CreateJob />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="edit-job/:id" element={<EditJob />} />
        <Route path="applications/:jobId" element={<Applicants />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;