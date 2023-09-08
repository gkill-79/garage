import React from "react";
import styles from "styles/footer.module.css";
import { SectionHoraire } from "./horaires";
import { useState, useEffect } from 'react'
import { userService } from 'services'
import { NavLink } from '.'
const Footer = () => {
  const [user, setUser] = useState(null)

    useEffect(() => {
        const subscription = userService.user.subscribe((x) => setUser(x))
        return () => subscription.unsubscribe()
    }, [])
  return (
    <footer className={` pt-5 ${styles.couleurFooter}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h4>Garage V.Parrot</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
              <li> Adresse : </li>
              <li> numéros :</li>
              <li> email : </li>
            </ul>
          </div>

          <div className="col-lg-4">
                        <h4>Informations</h4>
                        <div className={styles.trait}></div>
                        <ul className={`lh-lg ${styles.liste}`}>
                            {user &&
                            (user.roles === 'ADMIN' ||
                                user.roles === 'EMPLOYEE') ? (
                                <li className="nav-item">
                                    <NavLink
                                        href={'/admin'}
                                        className="nav-link "
                                    >
                                        Administration
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}

                                <li className="nav-item">
                                    <NavLink 
                                        href={'/contacts'} 
                                        className="nav-link "
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                            <li> Occasions</li>
                        </ul>
                    </div>

          <div className="col-lg-4">
            <h4>Horaires</h4>
            <div className={styles.trait}></div>
            <SectionHoraire />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;