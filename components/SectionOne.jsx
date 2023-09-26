import React from "react";
import styles from "../styles/section.module.css";
import Link from "next/link";


const SectionOne = () => {
  return (
    <section>
      <div className="container p-5 d-flex align-items-center">
        <div className="row">
          <div className="col-lg-6">
            <div className="imgGauche">
              <img
                className="img-fluid"
                src="/img/SectionOne.jpg"
                alt="sportif qui s'entraine"
              />
            </div>
          </div>

          {/* partie droite */}
          <div className="col-lg-6 ">
            <div className="ptexte p-5">
              <h2 className={`title-one ${styles.titleOne}`}>
                V Parrot s&apos;engage<br /></h2>
              <h4 className={`title-red ${styles.titleRed}`}>Prendre soin avec vous</h4>
              <h4 className={styles.titleEnd}>de votre Véhicule</h4>
              <h6 className={styles.titleLittle}>En quelques clics, trouvez votre prestation, obtenez un devis en ligne et prenez rendez-vous dans notre garage multimarques.</h6>

              <div className="texteDroite mt-4">
                <p>
                  
                </p>

                <p>
                 
                </p>
              </div>

              <div className="btn2 ">
                <Link href="/">
                  {" "}
                  <button className="btnGlobal mt-2">
                    RÉSERVE TA SÉANCE D&apos;ESSAI
                    <br />
                       <span className={styles.btnNum}>au 01 20 65 75 89</span>   

                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;