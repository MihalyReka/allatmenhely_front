import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function Dolgozok({ auth }) {
  const [dolgozok, setDolgozok] = useState([]);
  const [hiba, setHiba] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9091/api/dolgozo", {
      headers: {
        Authorization: auth?.authorization,
      },
    })
      .then((valasz) => {
        if (!valasz.ok) {
          throw new Error("Nem sikerült betölteni a dolgozókat.");
        }
        return valasz.json();
      })
      .then(setDolgozok)
      .catch((error) => setHiba(error.message));
  }, [auth]);

  return (
    <div className="dolgozok-oldal">
      <h1>Dolgozóink</h1>

      {hiba && <p>{hiba}</p>}

      <div className="dolgozok-lista">
        {dolgozok.map((dolgozo) => (
          <div
            className="dolgozo-kartya"
            key={dolgozo.id}
            onClick={() => navigate(`/dolgozo/${dolgozo.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h2>{dolgozo.nev}</h2>
            <p><strong>Beosztás:</strong> {dolgozo.beosztas}</p>
            <p><strong>Nem:</strong> {dolgozo.neme}</p>
            <p><strong>Születési dátum:</strong> {dolgozo.szDatum}</p>
            <p><strong>Telefonszám:</strong> {dolgozo.telefonSzam}</p>
            <p><strong>Email:</strong> {dolgozo.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dolgozok;