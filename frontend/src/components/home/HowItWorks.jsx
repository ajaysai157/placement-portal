import {
  FaUserPlus,
  FaUserEdit,
  FaSearch,
  FaBriefcase,
} from "react-icons/fa";

import "./HowItWorks.css";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Create Account",
    desc: "Register as a Student or Recruiter in just a few clicks.",
  },
  {
    icon: <FaUserEdit />,
    title: "Complete Profile",
    desc: "Add your details, skills, resume and profile information.",
  },
  {
    icon: <FaSearch />,
    title: "Apply for Jobs",
    desc: "Browse jobs from recruiters and apply instantly.",
  },
  {
    icon: <FaBriefcase />,
    title: "Get Hired",
    desc: "Recruiters review applications and hire the best candidates.",
  },
];

function HowItWorks() {
  return (
    <section className="how-section">
      <div className="container">
        <h2>How It Works</h2>
        <p>Your journey from student to professional in four simple steps.</p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-icon">{step.icon}</div>

              <h3>{step.title}</h3>

              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;