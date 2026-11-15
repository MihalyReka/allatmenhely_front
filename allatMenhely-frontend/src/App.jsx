import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bejelentkezes" element={<Login />} />
          <Route path="/regisztracio" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;;