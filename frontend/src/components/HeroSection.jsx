import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <h1 className="hero-title">Land Your Dream Job</h1>
      <p className="hero-description">
        Find internships and placement opportunities from top companies.
      </p>
      <div className="hero-buttons">
        <button className="primary-btn">Get Started</button>
        <button className="secondary-btn">Browse Jobs</button>
      </div>
    </section>
  );
}

export default HeroSection;