import React from "react";
import styles from "./DisplayProducts.module.css";
import BackButton from "../../components/Button/BackButton";
import { NavLink } from "react-router-dom";

const DisplayProducts = ({ url }) => {
  return (
    <div className={styles.displayProducts}>
      <div>
        <BackButton />
      </div>
      <div className={styles.main}>
        {url === "store" && <h3>VER TODAS AS OPÇÕES DE</h3>}
        <NavLink
          to={`/${url}/Marmitas`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          MARMITAS
        </NavLink>
        <NavLink
          to={`/${url}/Congelados`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          CONGELADOS
        </NavLink>
        <NavLink
          to={`/${url}/Caldos e Sopas`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          CALDOS
        </NavLink>
        <NavLink
          to={`/${url}/Sobremesas`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          SOBREMESAS
        </NavLink>
        <NavLink
          to={`/${url}/Coffee-Break`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          COFFEE-BREAK
        </NavLink>
        <NavLink
          to={`/${url}/Tortas`}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navlink
          }
        >
          TORTAS
        </NavLink>
      </div>
    </div>
  );
};

export default React.memo(DisplayProducts);
