
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./EgyDolgozo.css";

function EgyDolgozo({ auth }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dolgozo, setDolgozo] = useState(null);
  const [hiba, setHiba] = useState("");
  const [szerkesztes, setSzerkesztes] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9091/api/dolgozo/${id}`, {
      headers: {
        Authorization: auth?.authorization,
      },
    })
      .then((valasz) => {
        if (!valasz.ok) {
          throw new Error("Nem sikerült betölteni a dolgozó adatait.");
        }
        return valasz.json();
      })
      .then(setDolgozo)
      .catch((error) => setHiba(error.message));
  }, [id, auth]);

  const adatValtozas = (e) => {
    setDolgozo({
      ...dolgozo,
      [e.target.name]: e.target.value,
    });
  };

  const mentes = async () => {
    const valasz = await fetch(`http://localhost:9091/api/dolgozo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth?.authorization,
      },
      body: JSON.stringify(dolgozo),
    });

    if (valasz.ok) {
      setDolgozo(await valasz.json());
      setSzerkesztes(false);
      alert("Dolgozó adatai sikeresen módosítva!");
    } else {
      setHiba("Nem sikerült módosítani az adatokat.");
    }
  };

  const torles = async () => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a dolgozót?")) return;

    const valasz = await fetch(`http://localhost:9091/api/dolgozo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: auth?.authorization,
      },
    });

    if (valasz.ok) {
      navigate("/dolgozok");
    } else {
      setHiba("Nem sikerült törölni a dolgozót.");
    }
  };

  if (hiba) return <p>{hiba}</p>;
  if (!dolgozo) return <p>Betöltés...</p>;

  return (
    <div className="egy-dolgozo-oldal">
      <div className="egy-dolgozo-kartya">
        <h1>{dolgozo.nev}</h1>

        {szerkesztes ? (
          <>
            <label>Név:</label>
            <input name="nev" value={dolgozo.nev || ""} onChange={adatValtozas} />

            <label>Nem:</label>
            <select name="neme" value={dolgozo.neme || ""} onChange={adatValtozas}>
              <option value="FERFI">Férfi</option>
              <option value="NO">Nő</option>
            </select>

            <label>Születési dátum:</label>
            <input type="date" name="szDatum" value={dolgozo.szDatum || ""} onChange={adatValtozas} />

            <label>Telefonszám:</label>
            <input name="telefonSzam" value={dolgozo.telefonSzam || ""} onChange={adatValtozas} />

            <label>Email:</label>
            <input type="email" name="email" value={dolgozo.email || ""} onChange={adatValtozas} />

            <label>Beosztás:</label>
            <input name="beosztas" value={dolgozo.beosztas || ""} onChange={adatValtozas} />

            <button onClick={mentes}>Mentés</button>
          </>
        ) : (
          <>
            <p><strong>Nem:</strong> {dolgozo.neme}</p>
            <p><strong>Születési dátum:</strong> {dolgozo.szDatum}</p>
            <p><strong>Telefonszám:</strong> {dolgozo.telefonSzam}</p>
            <p><strong>Email:</strong> {dolgozo.email}</p>
            <p><strong>Beosztás:</strong> {dolgozo.beosztas}</p>

            <button onClick={() => setSzerkesztes(true)}>Szerkesztés</button>
          </>
        )}

        <button onClick={torles}>Dolgozó törlése</button>
        <button onClick={() => navigate("/dolgozok")}>Vissza</button>
      </div>
    </div>
  );
}

export default EgyDolgozo;