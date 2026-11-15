
import "./Navbar.css";
import { Link } from "react-router";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Állatmenhely
      </div>

      <div className="navbar-links">
        <Link to="/">Állataink</Link>
        <Link to="/bejelentkezes">Bejelentkezés</Link>
        <Link to="/regisztracio">Regisztráció</Link>
      </div>
    </nav>
  );
}

export default Navbar;