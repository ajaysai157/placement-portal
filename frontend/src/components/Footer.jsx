import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Placement Portal</h3>
          <p>
            Helping students connect with top recruiters and launch their
            careers.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Jobs</li>
            <li>Companies</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email: support@placementportal.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Placement Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;