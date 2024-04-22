import styles from "./ProductCard.module.css";
import React from "react";

const ProductCard = ({ src, name, price, description, condition, value }) => {
  const onlyDigits = price
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(0, "0");

  price = onlyDigits.slice(0, -2) + "," + onlyDigits.slice(-2);

  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={src} alt={name} />
      </div>
      <span className={styles.name}>{name}</span>
      <label className={styles.description}>{description}</label>
      <div className={styles.priceAdd}>
        <div>
          <span className={styles.price}>
            R${price}
          </span>
        </div>
     
          <div className={styles.add}>
            <button onClick={condition ? value : undefined}>+</button>
            <span>1</span>
            <button className={styles.minus} onClick={condition ? value : undefined}>
              -
            </button>
          </div>
      
      </div>
    </div>
  );
};

export default ProductCard;
