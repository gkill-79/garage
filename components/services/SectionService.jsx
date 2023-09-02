import { serviceService } from "services";
import { useState, useEffect } from "react";


export { SectionService };

function SectionService() {
  const [sevices, setServices] = useState(null);
  useEffect(() => {
    seviceService.getAll().then((x) => setServices(x));
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