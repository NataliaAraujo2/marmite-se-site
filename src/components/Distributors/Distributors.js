import React, { useState } from "react";
import styles from "./Distributors.module.css";
import imageDefault from "../../images/logo.png";
import { FaDollarSign, FaRegStar } from "react-icons/fa";
import { FaNfcDirectional } from "react-icons/fa6";

const Distributors = () => {
  const [image] = useState(imageDefault);
  return (
    <li className={styles.distributors}>
      <div className={styles.image}>
        <img src={image} alt="Imagem do logo do distribuidor" />
      </div>
      <div className={styles.tittle}>
        <b>Nome do Distribuidor</b>
        <div className={styles.infos}>
          <FaRegStar className={styles.star} />
          <text>4,5</text>
          <FaDollarSign />
          <text> $$$</text>
          <FaNfcDirectional />
          <text> 2,8km</text>
        </div>
        <labe>Frete Grátis</labe>
      </div>
    </li>
  );
};

export default Distributors;
