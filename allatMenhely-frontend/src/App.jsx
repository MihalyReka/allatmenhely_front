import { Routes, Route } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [auth, setAuth] = useState(null);

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

    setAuth({
      username: user.username,
      role: user.role,
      authorization: authorization,
    });
  }

  function handleLogout() {
    setAuth(null);
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
          <Route path="/regisztracio" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;