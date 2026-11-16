import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./EgyAllat.css";

function EgyAllat({ auth }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allat, setAllat] = useState(null);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9091/api/animals/${id}`, {
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

  if (hiba) return <p>{hiba}</p>;
  if (!allat) return <p>Betöltés...</p>;

  return (
    <div className="egy-allat-oldal">
      <div className="egy-allat-kartya">
        <h1>{allat.nev}</h1>
              <p><strong>Fajta:</strong> {allat.fajta}</p>
              <p><strong>Állattípus:</strong> {allat.allatTipus}</p>
              <p><strong>Nem:</strong> {allat.neme}</p>
              <p><strong>Születési dátum:</strong> {allat.szDatum}</p>
              <p><strong>Érkezés dátuma:</strong> {allat.arrivalDate}</p>
              <p><strong>Fogadási állapot:</strong> {allat.fogadasiAllapot}</p>
              <p><strong>Egészségi állapot:</strong> {allat.egeszsegAllapot}</p>


        <button onClick={() => navigate("/")}>
          Vissza az állatokhoz
        </button>
      </div>
    </div>
  );
}

export default EgyAllat;