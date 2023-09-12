import { prestationService } from "services";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";
import Link from "next/link";
import Image from "next/image";

export { SectionPrestation };

function SectionPrestation() {
  const [prestations, setPrestations] = useState(null);
  useEffect(() => {
    prestationService.getAll().then((x) => setPrestations(x));
  }, []);

  return (
    <>
      <section>
        <div className="container mt-2">
          {prestations &&
            prestations.map((prestation) => (
              <div className="col-lg-4" key={prestation.id}>
                <div className={styles.txtBas}>
                  <Image
                    className="img-fluid"
                    src={`/img/${prestation.image}`}
                    alt="repas "
                    width={800}
                    height={533}
                  />

                  <div className={styles.separation}></div>
                  <div className={styles.blocCard}>
                    <h4 className={styles.titreBlog}>{prestation.title}</h4>
                    <div className={styles.trait2}></div>
                    <Link
                      className={styles.liensArticle}
                      href={`/prestation/${prestation.id}`}
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
