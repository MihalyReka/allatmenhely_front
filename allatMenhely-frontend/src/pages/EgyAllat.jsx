import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./EgyAllat.css";

function EgyAllat({ auth }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allat, setAllat] = useState(null);
  const [hiba, setHiba] = useState("");
  const [szerkesztes, setSzerkesztes] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9091/api/animals/public/${id}`, {
      headers: {
        Authorization: auth?.authorization,
      },
    })
      .then((valasz) => {
        if (!valasz.ok) {
          throw new Error("Nem sikerült betölteni az állat adatait.");
        }
        return valasz.json();
      })
      .then(setAllat)
      .catch((error) => setHiba(error.message));
  }, [id, auth]);

  const kezeles = (e) => {
    setAllat({
      ...allat,
      [e.target.name]: e.target.value,
    });
  };

  const mentes = () => {
    fetch(`http://localhost:9091/api/animals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth?.authorization,
      },
      body: JSON.stringify(allat),
    })
      .then((valasz) => {
        if (!valasz.ok) {
          throw new Error("Nem sikerült menteni az adatokat.");
        }
        return valasz.json();
      })
      .then((adat) => {
        setAllat(adat);
        setSzerkesztes(false);
      })
      .catch((error) => setHiba(error.message));
  };

  if (hiba) return <p>{hiba}</p>;
  if (!allat) return <p>Betöltés...</p>;

  return (
    <div className="egy-allat-oldal">
      <div className="egy-allat-kartya">
        <h1>{allat.nev}</h1>

        {szerkesztes ? (
          <>
            <p>Név: <input name="nev" value={allat.nev || ""} onChange={kezeles} /></p>
            <p>Fajta: <input name="fajta" value={allat.fajta || ""} onChange={kezeles} /></p>
            <p>Állattípus: <input name="allatTipus" value={allat.allatTipus || ""} onChange={kezeles} /></p>

            <p>Nem:
              <select name="neme" value={allat.neme || ""} onChange={kezeles}>
                <option value="KAN">Kan</option>
                <option value="SZUKA">Szuka</option>
                <option value="HIM">Hím</option>
                <option value="NOSTENY">Nőstény</option>
              </select>
            </p>

            <p>Születési dátum:
              <input type="date" name="szDatum" value={allat.szDatum || ""} onChange={kezeles} />
            </p>

            <p>Érkezés dátuma:
              <input type="date" name="arrivalDate" value={allat.arrivalDate || ""} onChange={kezeles} />
            </p>

            <p>Fogadási állapot:
              <input name="fogadasiAllapot" value={allat.fogadasiAllapot || ""} onChange={kezeles} />
            </p>

            <p>Egészségi állapot:
              <input name="egeszsegAllapot" value={allat.egeszsegAllapot || ""} onChange={kezeles} />
            </p>

            <button onClick={mentes}>Mentés</button>
            <button onClick={() => setSzerkesztes(false)}>Mégse</button>
          </>
        ) : (
          <>
            <p><strong>Fajta:</strong> {allat.fajta}</p>
            <p><strong>Állattípus:</strong> {allat.allatTipus}</p>
            <p><strong>Nem:</strong> {allat.neme}</p>
            <p><strong>Születési dátum:</strong> {allat.szDatum}</p>
            <p><strong>Érkezés dátuma:</strong> {allat.arrivalDate}</p>
            <p><strong>Fogadási állapot:</strong> {allat.fogadasiAllapot}</p>
            <p><strong>Egészségi állapot:</strong> {allat.egeszsegAllapot}</p>

   {(auth?.role === "DOLGOZO" || auth?.role === "ADMIN") && (
              <button onClick={() => setSzerkesztes(true)}>
                Módosítás
              </button>
            )}
          </>
        )}

        <button onClick={() => navigate("/")}>
          Vissza az állatokhoz
        </button>
      </div>
    </div>
  );
}

export default EgyAllat;
