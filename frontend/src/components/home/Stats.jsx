import "./Home.css";

function Stats() {
  const stats = [
    {
      number: "500+",
      label: "Companies",
    },
    {
      number: "10K+",
      label: "Students",
    },
    {
      number: "2500+",
      label: "Jobs",
    },
    {
      number: "95%",
      label: "Placement Rate",
    },
  ];

  return (
    <section className="stats">

      {stats.map((item) => (

        <div
          key={item.label}
          className="stat-card"
        >
          <h2>{item.number}</h2>

          <p>{item.label}</p>
        </div>

      ))}

    </section>
  );
}

export default Stats;