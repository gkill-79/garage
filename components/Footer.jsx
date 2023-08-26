import React from "react";
import styles from "styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={` pt-5 ${styles.couleurFooter}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h4>Mpower Gym</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
              <li> Adresse : </li>
              <li> numéros :</li>
              <li> email : </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h4> Aide & Informations</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
              
              
              <li> Contact</li>
              <li> Blog</li>
              <li> La Franchise</li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h4>Horaires</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
              <li> Lundi - 06h00 - 23h00</li>
              <li> Mardi - 06h00 - 23h00</li>
              <li> Mercredi - 06h00 - 23h00</li>
              <li>Jeudi - 06h00 - 23h00</li>
              <li>Vendredi - 06h00 - 23h00</li>
              <li>Samedi - 06h00 - 23h00</li>
              <li>Dimanche - 06h00 - 23h00</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;