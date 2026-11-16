import { useEffect, useState } from "react";
import { Link } from "react-router";


function Befogadok({ auth }) {
  const [befogadok, setBefogadok] = useState([]);
  const [hiba, setHiba] = useState("");
    useEffect(() => {
      async function befogadokLekerese() {
        try {
          const response = await fetch(
            "http://localhost:9091/api/befogado",
            {
              headers: {
                Authorization: auth.authorization,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Nem sikerült lekérni a befogadókat.");
          }

          const eredmeny = await response.json();
          setBefogadok(eredmeny);
        } catch (error) {
          setHiba(error.message);
        }
      }

      if (auth) {
        befogadokLekerese();
      }
    }, [auth]);
 return (
   <div className="befogado-lista">
     {befogadok.map((befogado) => (
       <div className="befogado-kartya" key={befogado.id}>
         <h2>
           <Link to={`/befogadok/${befogado.id}`}>
             {befogado.nev}
           </Link>
         </h2>

         <p>Nem: {befogado.neme}</p>
         <p>Születési dátum: {befogado.szDatum}</p>
         <p>Telefonszám: {befogado.telefonSzam}</p>
         <p>E-mail: {befogado.email}</p>
       </div>
     ))}
   </div>
 );
}

export default Befogadok;


