import "./CompanySection.css";

function CompanySection() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Accenture",
  ];

  return (
    <section className="company-section">
      <h2 className="company-title">Trusted Companies</h2>

      <div className="company-container">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            {company}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CompanySection;