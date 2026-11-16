
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


function EgyBefogado({ auth }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [befogado, setBefogado] = useState(null);
  const [hiba, setHiba] = useState("");
  const [szerkesztes, setSzerkesztes] = useState(auth?.role === "ADMIN");

  const [urlapAdatok, setUrlapAdatok] = useState({
    nev: "",
    neme: "",
    szDatum: "",
    telefonSzam: "",
    email: "",
  });

  useEffect(() => {
    async function befogadoLekerese() {
      try {
        const response = await fetch(
          `http://localhost:9091/api/befogado/${id}`,
          {
            headers: {
              Authorization: auth.authorization,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Nem sikerült lekérni a befogadó adatait.");
        }

        const eredmeny = await response.json();

        setBefogado(eredmeny);

        setUrlapAdatok({
          nev: eredmeny.nev,
          neme: eredmeny.neme,
          szDatum: eredmeny.szDatum,
          telefonSzam: eredmeny.telefonSzam,
          email: eredmeny.email,
        });

      } catch (error) {
        setHiba(error.message);
      }
    }

    if (auth) {
      befogadoLekerese();
    }
  }, [auth, id]);

  async function befogadoMentes() {
    try {
      const response = await fetch(
        `http://localhost:9091/api/befogado/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth.authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(urlapAdatok),
        }
      );

      if (!response.ok) {
        throw new Error("Nem sikerült módosítani a befogadó adatait.");
      }

      const eredmeny = await response.json();

      setBefogado(eredmeny);
      setUrlapAdatok({
        nev: eredmeny.nev,
        neme: eredmeny.neme,
        szDatum: eredmeny.szDatum,
        telefonSzam: eredmeny.telefonSzam,
        email: eredmeny.email,
      });

    } catch (error) {
      setHiba(error.message);
    }
  }

  async function befogadoTorlese() {
    const megerosites = window.confirm(
      "Biztosan törölni szeretnéd ezt a befogadót?"
    );

    if (!megerosites) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9091/api/befogado/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth.authorization,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Nem sikerült törölni a befogadót.");
      }

      alert("A befogadó sikeresen törölve!");
      navigate("/befogadok");
    } catch (error) {
      setHiba(error.message);
    }
  }

  if (hiba) return <p>{hiba}</p>;
  if (!befogado) return <p>Adatok betöltése...</p>;

    return (
      <div className="befogado-oldal">
        {szerkesztes && auth.role === "ADMIN" ? (
          <div className="befogado-kartya">
            <h1>Befogadó adatainak módosítása</h1>

            <form
              className="befogado-urlap"
              onSubmit={(e) => {
                e.preventDefault();
                befogadoMentes();
              }}
            >
              <div className="urlap-mezo">
                <label htmlFor="nev">Név:</label>
                <input
                  type="text"
                  id="nev"
                  value={urlapAdatok.nev}
                  onChange={(e) =>
                    setUrlapAdatok({
                      ...urlapAdatok,
                      nev: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="urlap-mezo">
                <label htmlFor="neme">Nem:</label>
                <select
                  id="neme"
                  value={urlapAdatok.neme}
                  onChange={(e) =>
                    setUrlapAdatok({
                      ...urlapAdatok,
                      neme: e.target.value,
                    })
                  }
                  required
                >
                  <option value="FEMALE">Nő</option>
                  <option value="MALE">Férfi</option>
                </select>
              </div>

              <div className="urlap-mezo">
                <label htmlFor="szDatum">Születési dátum:</label>
                <input
                  type="date"
                  id="szDatum"
                  value={urlapAdatok.szDatum}
                  onChange={(e) =>
                    setUrlapAdatok({
                      ...urlapAdatok,
                      szDatum: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="urlap-mezo">
                <label htmlFor="telefonSzam">Telefonszám:</label>
                <input
                  type="tel"
                  id="telefonSzam"
                  value={urlapAdatok.telefonSzam}
                  onChange={(e) =>
                    setUrlapAdatok({
                      ...urlapAdatok,
                      telefonSzam: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="urlap-mezo">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  value={urlapAdatok.email}
                  onChange={(e) =>
                    setUrlapAdatok({
                      ...urlapAdatok,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="urlap-gombok">
                <button type="submit" className="gomb-mentes">
                  Módosítások mentése
                </button>

                <button
                  type="button"
                  className="gomb-torles"
                  onClick={befogadoTorlese}
                >
                  Befogadó törlése
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="befogado-kartya befogado-adatok">
            <h1>Befogadó adatai</h1>

            <p><strong>Név:</strong> {befogado.nev}</p>
            <p><strong>Nem:</strong> {befogado.neme}</p>
            <p><strong>Születési dátum:</strong> {befogado.szDatum}</p>
            <p><strong>Telefonszám:</strong> {befogado.telefonSzam}</p>
            <p><strong>E-mail:</strong> {befogado.email}</p>

            {auth.role === "ADMIN" && (
              <button
                type="button"
                className="gomb-torles"
                onClick={befogadoTorlese}
              >
                Befogadó törlése
              </button>
            )}
          </div>
        )}
      </div>
    );
}

export default EgyBefogado;