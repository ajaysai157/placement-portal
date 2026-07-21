import "./Companies.css";

const companies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Adobe",
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
];

function Companies() {
  return (
    <section className="companies-section" id="companies">
      <div className="companies-header">
        <span>Trusted by Leading Companies</span>
        <h2>Companies Hiring Through Our Platform</h2>
      </div>

      <div className="companies-slider">

        <div className="companies-track">

          {[...companies, ...companies].map((company, index) => (
            <div className="company-card" key={index}>
              {company}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Companies;