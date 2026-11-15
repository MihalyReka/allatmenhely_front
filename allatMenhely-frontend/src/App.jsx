import { Routes, Route,useNavigate  } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SajatAdat from "./pages/SajatAdat";
import Befogadok from "./pages/Befogadok";
import EgyBefogado from "./pages/EgyBefogado";
import Dolgozok from "./pages/Dolgozok";

function App() {
  const [auth, setAuth] = useState(() => {
    const mentettAuth = sessionStorage.getItem("auth");

    return mentettAuth ? JSON.parse(mentettAuth) : null;
  });
  const navigate = useNavigate();

  async function handleLogin(username, password) {
    const authorization = "Basic " + btoa(username + ":" + password);

    const response = await fetch(
      "http://localhost:9091/api/auth/me",
      {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Hibás felhasználónév vagy jelszó!");
    }

    const user = await response.json();

    const ujAuth = {
      username: user.username,
      role: user.role,
      authorization: authorization,
    };

    sessionStorage.setItem("auth", JSON.stringify(ujAuth));
    setAuth(ujAuth);
  }

  function handleLogout() {
       sessionStorage.removeItem("auth");
       setAuth(null);
       navigate("/");
  }

  return (
    <div>
      <Navbar auth={auth} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bejelentkezes"
            element={<Login onLogin={handleLogin} auth={auth} />}
          />
          <Route
                path="/regisztracio"
                element={<Register />} />
          <Route
                path="/sajat-adataim"
                element={<SajatAdat auth={auth} />}
          />
          <Route
                path="/befogadok"
                element={<Befogadok auth={auth}/>}
          />
          <Route
                path="/dolgozok"
                element={<Dolgozok/>}
          />
          <Route
            path="/befogadok/:id"
            element={<EgyBefogado auth={auth} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;