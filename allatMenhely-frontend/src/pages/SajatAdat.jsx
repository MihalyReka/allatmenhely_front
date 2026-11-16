import { useEffect, useState } from "react";


function SajatAdat({ auth }) {
  const [adatok, setAdat] = useState(null);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    async function adatokLekerese() {
      let vegpont = "";

      if (auth.role === "BEFOGADO") {
        vegpont = "http://localhost:9091/api/befogado/sajat";
      } else if (auth.role === "DOLGOZO" || auth.role === "ADMIN") {
        vegpont = "http://localhost:9091/api/dolgozo/sajat";
      }

      if (!vegpont) {
        setHiba("Ehhez a felhasználói szerepkörhöz nincs saját adatlap.");
        return;
      }

      try {
        const response = await fetch(vegpont, {
          headers: {
            Authorization: auth.authorization,
          },
        });

        if (!response.ok) {
          throw new Error("Nem sikerült lekérni a saját adatokat.");
        }

        const eredmeny = await response.json();
        setAdat(eredmeny);
      } catch (error) {
        setHiba(error.message);
      }
    }

    if (auth) {
      adatokLekerese();
    }
  }, [auth]);

  if (hiba) {
    return <p>{hiba}</p>;
  }

  if (!adatok) {
    return <p>Adatok betöltése...</p>;
  }

return (
  <div className="sajat-adatok">
    <h1>Saját adataim</h1>

    <div className="adatlap">
      <p><strong>Név:</strong> {adatok.nev}</p>
      {adatok.beosztas && (
        <p>
          <strong>Beosztás:</strong> {adatok.beosztas}
        </p>
      )}
      <p><strong>E-mail cím:</strong> {adatok.email}</p>
      <p><strong>Nem:</strong> {adatok.neme}</p>
      <p><strong>Születési dátum:</strong> {adatok.szDatum}</p>
      <p><strong>Telefonszám:</strong> {adatok.telefonSzam}</p>
    </div>
  </div>
);
}

export default SajatAdat;


