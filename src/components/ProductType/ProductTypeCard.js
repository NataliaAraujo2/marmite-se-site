import React from "react";
//CSS
import styles from "./ProductTypeCard.module.css";

import Button from "../Button/NavLinkButton";
import { FaInfo } from "react-icons/fa";


const ProductTypeCard = ({ image, Title, feature, to }) => {
  return (
    <div className={styles.productTypeCard}>
      <div className={styles.imageDiv}>
        <img src={image} alt={`Imagem de ${Title}`} className={styles.image} />
      </div>
      <div className={styles.title}>
        <p>{Title}</p>
      </div>
      <div className={styles.features}>
        <li>{feature[0]}</li>
        <li>{feature[1]}</li>
        <li>{feature[2]}</li>
        <li>{feature[3]}</li>
        <li>{feature[4]}</li>
      </div>
      <div className={styles.button}>
        <Button Icon={FaInfo} to={to} Text="Saiba Mais" />
      </div>
    </div>
  );
};

export default ProductTypeCard;
