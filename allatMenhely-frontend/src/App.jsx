import { Routes, Route,useNavigate  } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Allatok from "./pages/Allatok";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SajatAdat from "./pages/SajatAdat";
import Befogadok from "./pages/Befogadok";
import EgyBefogado from "./pages/EgyBefogado";
import Dolgozok from "./pages/Dolgozok";
import EgyDolgozo from "./pages/EgyDolgozo";
import EgyAllat from "./pages/EgyAllat"

function App() {
  const [auth, setAuth] = useState(() => {
    const mentettAuth = sessionStorage.getItem("auth");

    return mentettAuth ? JSON.parse(mentettAuth) : null;
  });
  const navigate = useNavigate();

async function handleLogin(username, password) {
  const response = await fetch(
    "http://localhost:9091/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Hibás felhasználónév vagy jelszó!");
  }

  const user = await response.json();

  const ujAuth = {
    username: user.username,
    role: user.role,
    authorization: "Bearer " + user.token,
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
          <Route path="/" element={<Allatok/>} />
          <Route
            path="/bejelentkezes"
            element={<Login onLogin={handleLogin} auth={auth} />}
          />
          <Route
            path="/allat/:id"
            element={<EgyAllat auth={auth} />}
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
                element={<Dolgozok auth={auth}/>}
          />
          <Route
                path="/dolgozo/:id"
                element={<EgyDolgozo auth={auth}/>}
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