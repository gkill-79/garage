import { occasionService } from "services";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/occasion.module.css";


export { SectionOccasion };

function SectionOccasion() {
  const [occasions, setOccasions] = useState(null);
  useEffect(() => {
    occasionService.getVarious().then((x) => setOccasions(x));
  }, []);

  return (
    <>
    <article>
      <div className={styles.actu}>
        <h2 className="text-center">Nos Occasions</h2>
        <div className={styles.trait}></div>
      </div>
      <div className="container mt-5   ">
        <div className="row ">
          {occasions &&
            occasions.map((occasion) => (
              <div className="col-lg-4" key={occasion.id}>
                <div className={styles.txtBas}>
                <img
                    className="img-fluid"
                    src={`img/${occasion.image1}`}
                    alt="repas "
                  />
                  <div className={styles.separation}></div>
                  <div className={styles.blocCard}>
                    <h4 className={styles.titreBlog}>{occasion.marque} {occasion.model}</h4>
                    <div className={styles.trait2}></div>
                    <Link
                      className={styles.liensArticle}
                      href={`/occasions/occasion/${occasion.id}`}
                    >
                      Lire la suite
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </article>
    </>
 );

}