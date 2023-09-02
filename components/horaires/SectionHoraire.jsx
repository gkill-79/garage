import { horaireService } from "services";
import { useState, useEffect } from "react";


export { SectionHoraire };

function SectionHoraire() {
  const [horaires, setHoraires] = useState(null);
  useEffect(() => {
    horaireService.getAll().then((x) => setHoraires(x));
  }, []);

  return (
    <>
      <section>
        <div className="container mt-2">
            <ul className="list-unstyled smaller">
              {horaires &&
                horaires.map((horaire) => (
                  <li key={horaire.id}>
                    <span className="fw-bold">{horaire.jour} :</span>
                    <span>{horaire.fermeture_am ? "Fermé" : ` ${ horaire.debut_am } - ${ horaire.fin_am }`} / </span> 
                    <span>{horaire.fermeture_pm ? "Fermé" : ` ${ horaire.debut_pm } - ${ horaire.fin_pm }`}</span> 
                  </li>
                  )
                )
              }
            </ul>
        </div>
      </section>
    </>
  );
}