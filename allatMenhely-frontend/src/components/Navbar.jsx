import "./Navbar.css";
import { Link } from "react-router";

function Navbar({ auth, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Állatmenhely
      </div>

      <div className="navbar-links">
        <Link to="/">Állataink</Link>

        {!auth ? (
          <>
            <Link to="/bejelentkezes">Bejelentkezés</Link>
            <Link to="/regisztracio">Regisztráció</Link>
          </>
        ) : (
          <>
            {(auth.role === "DOLGOZO" || auth.role === "ADMIN") && (
              <Link to="/befogadok">Befogadók</Link>
            )}

            {auth.role === "ADMIN" && (
              <Link to="/dolgozok">Dolgozóink</Link>
            )}

            <Link to="/sajat-adataim">Saját adataim</Link>

            <button
              type="button"
              className="navbar-logout"
              onClick={onLogout}
            >
              Kijelentkezés
            </button>

            <span className="navbar-user">
              {auth.username}
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;