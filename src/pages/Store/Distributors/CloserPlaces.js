import React from "react";
import styles from "./CloserPlaces.module.css";
import Distributors from "../../../components/Distributors/Distributors";
import PlacesMap from "../../../components/PlacesMap/PlacesMap";

const CloserPlaces = () => {
  return (
    <div className={styles.closerPlaces}>
      <h5>MAIS PRÓXIMOS DE VOCÊ</h5>
      <ul className={styles.distributorsInfos}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
          <div className={styles.distributorsInfosItems} key={p}>
            <Distributors />
          </div>
        ))}
      </ul>
      <div className={styles.placesMap}>
        <PlacesMap />
      </div>
    </div>
  );
};

export default CloserPlaces;
