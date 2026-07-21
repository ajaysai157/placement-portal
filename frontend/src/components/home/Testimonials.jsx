import "./Home.css";

function Testimonials() {

  const reviews = [
    {
      name: "Rahul",
      text: "Got placed at Amazon through this portal.",
    },
    {
      name: "Priya",
      text: "Very easy to apply for jobs.",
    },
    {
      name: "Sai",
      text: "Professional recruiter dashboard.",
    },
  ];

  return (
    <section id="testimonials" className="testimonials">

      <h2>Student Success Stories</h2>

      <div className="testimonial-grid">

        {reviews.map((review) => (

          <div
            key={review.name}
            className="testimonial-card"
          >

            <p>"{review.text}"</p>

            <h4>- {review.name}</h4>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;