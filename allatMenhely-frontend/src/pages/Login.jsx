import { useState } from "react";
import { useNavigate } from "react-router";


function Login({ onLogin, auth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await onLogin(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (auth) {
    return <h2>Már be vagy jelentkezve!</h2>;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Bejelentkezés</h1>
        <p>Jelentkezz be a saját fiókodba!</p>

        <label>Felhasználónév</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label>Jelszó</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p className="login-error">{error}</p>
        )}

        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
}

export default Login;