
import { useState } from "react";


function Register() {
  const [uzenet, setUzenet] = useState("");
  const [hiba, setHiba] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setUzenet("");
    setHiba(false);

    const form = event.target;

    const felhasznalo = {
      username: form.username.value,
      password: form.password.value,
      nev: form.nev.value,
      email: form.email.value,
      neme: form.neme.value,
      szDatum: form.szDatum.value,
      telefonSzam: form.telefonSzam.value
    };

    try {
      const response = await fetch(
        "http://localhost:9091/api/felhasznalok/regisztracio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(felhasznalo)
        }
      );

      if (!response.ok) {
        const valasz = await response.text();
        throw new Error(valasz || "Sikertelen regisztráció!");
      }

      setUzenet("Sikeres regisztráció! Most már bejelentkezhetsz.");
      form.reset();

    } catch (error) {
      setHiba(true);
      setUzenet(error.message || "Nem sikerült kapcsolódni a szerverhez.");
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Regisztráció</h1>
        <p>Hozd létre saját befogadói fiókodat!</p>

        <label>Felhasználónév</label>
        <input type="text" name="username" required />

        <label>Teljes név</label>
        <input type="text" name="nev" required />

        <label>E-mail cím</label>
        <input type="email" name="email" required />

        <label>Jelszó</label>
        <input
          type="password"
          name="password"
          minLength={8}
          required
        />

        <label>Nem</label>
        <select name="neme" required defaultValue="">
          <option value="" disabled>Válassz nemet!</option>
          <option value="FEMALE">Nő</option>
          <option value="MALE">Férfi</option>
        </select>

        <label>Születési dátum</label>
        <input type="date" name="szDatum" required />

        <label>Telefonszám</label>
        <input
          type="tel"
          name="telefonSzam"
          placeholder="+36301234567"
          pattern="^\+?[0-9]{8,15}$"
          required
        />

        <button type="submit">Regisztráció</button>

        {uzenet && (
          <p className={hiba ? "register-error" : "register-success"}>
            {uzenet}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;