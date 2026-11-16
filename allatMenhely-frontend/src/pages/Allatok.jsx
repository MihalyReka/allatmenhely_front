import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function Allatok({ auth }) {
  const [allatok, setAllatok] = useState([]);
  const [hiba, setHiba] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:9091/api/animals/public")
    .then((valasz) => {
      if (!valasz.ok) {
        throw new Error("Nem sikerült betölteni az állatokat.");
      }
      return valasz.json();
    })
    .then(setAllatok)
    .catch((error) => setHiba(error.message));
}, [auth]);

  return (
    <div className="allatok-oldal">
      <h1>Állataink</h1>

      {hiba && <p>{hiba}</p>}

       <div className="allatok-lista">
         {allatok.map((allat) => (
           <div
             className="allat-kartya"
             key={allat.id}
             onClick={() => navigate(`/allat/${allat.id}`)}
             style={{ cursor: "pointer" }}
           >
             <h2>{allat.nev}</h2>
             <p><strong>Fajta:</strong> {allat.fajta}</p>
             <p><strong>Állattípus:</strong> {allat.allatTipus}</p>
             <p><strong>Nem:</strong> {allat.neme}</p>
             <p><strong>Születési dátum:</strong> {allat.szDatum}</p>
           </div>
         ))}
       </div>
    </div>
  );
}

export default Allatok;