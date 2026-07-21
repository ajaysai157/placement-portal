import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">

      <h1>404</h1>

      <h2>Oops! Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="home-btn">
        Back to Home
      </Link>

    </section>
  );
}

export default NotFound;