import "./FeaturesSection.css";

function FeaturesSection() {
  const features = [
    {
      title: "Easy Applications",
      description: "Apply to jobs with a simple and user-friendly process.",
    },
    {
      title: "Top Recruiters",
      description: "Connect with leading companies across various industries.",
    },
    {
      title: "Secure Platform",
      description: "Your personal information and applications remain protected.",
    },
  ];

  return (
    <section className="features-section">
      <h2 className="features-title">Why Choose Us?</h2>

      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;