import styles from "./ProductCard.module.css";
import React, { useEffect, useState } from "react";



const ProductCard = ({ addToCart, individualProduct }) => {
  const [price, setPrice] = useState("");
  const [cancelled, setCancelled] = useState(false);



  useEffect(() => {
    if (cancelled) return;

    if (individualProduct) {
      const onlyDigits = individualProduct.price
        .toString()
        .split("")
        .filter((s) => /\d/.test(s))
        .join("")
        .padStart(0, "0");

      setPrice(onlyDigits.slice(0, -2) + "," + onlyDigits.slice(-2));
    }
    return () => {
      if (price) {
        setCancelled(true);
      }
    };
  }, [individualProduct, price, cancelled]);

  const handleAddToCart = () => {
    addToCart(individualProduct);
  };

  return (
    <div className={styles.productCard} key={individualProduct.id}>
      <div className={styles.image}>
        <img src={individualProduct.url} alt={individualProduct.name} />
      </div>
      <div className={styles.productDetails} key={individualProduct.id}>
        <span className={styles.name}>{individualProduct.name}</span>

        <label className={styles.description}>
          {individualProduct.description}
        </label>

        <span className={styles.price}>R${price}</span>
      </div>
      <div className={styles.button}>
        <button className={styles.addToCart} onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
