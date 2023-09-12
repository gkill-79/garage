import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import styles from "styles/header.module.css";

const ConditionalNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const subscription = userService.user.subscribe(x => setUser(x));
      return () => subscription.unsubscribe();
  }, []);


  if (user ) {
    return (
      <>
        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink href={"/"} className="nav-link ">
              {" "}
              Accueil
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink href={"/"} className="nav-link ">
              Concept
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink href={"/occasion"} className="nav-link ">
              Occasions
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink href={"/services"} className="nav-link ">
              Commentaires
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink href={"/contacts"} className="nav-link ">
              {user.firstName}
            </NavLink>
          </li>
        </ul>
               
        <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>


    
      </>
    );
  } else {
    return (
      <>
        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink href="/" className="nav-link ">
              Accueil
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink href="/" className="nav-link ">
              Concept
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink href="/occasions" className="nav-link ">
              Occasions
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink href={"/services"} className="nav-link ">
              Services
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav d-flex  align-items-center  ">
          <li className="nav-item navigationBoutons ">
            <NavLink href={"/account/register"} className={` ${styles.btnInscription}  `}>
              S&apos;inscrire
            </NavLink>
          </li>

          <li className="nav-item ">
            <NavLink href="/" className="  nav-NavLink">
              <img src="img/Icon.png" alt="Logo " className={styles.imgLogo} />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              href={"/account/login"}
              className={`nav-link ${styles.btnConnection} `}
            >
              Se connecter
            </NavLink>
          </li>
        </ul>
      </>
    );
  }
};

export default ConditionalNav;