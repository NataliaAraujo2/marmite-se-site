import styles from "./ProductCard.module.css";
import React, { useEffect, useState } from "react";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";

const ProductCard = ({ addToCart, individualProduct }) => {
  const [accompaniments, setAccompaniments] = useState(false);
  const [price, setPrice] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const state = "ATIVO";
  const { documents: products } = useFetchDocuments("products", null, state);
  const [existProduct, setExistProduct] = useState([]);

  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (products) {
      const sortProductsName = products.sort(compare);
      setExistProduct(sortProductsName);
    }
  }, [products]);

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
      {accompaniments && (
        <div className={styles.accompanimentsDiv}>
          {existProduct &&
            existProduct.map((product) => (
              <>
                {product.branchName === "Acompanhamentos" && (
                  <div className={styles.accompaniments}>
                    <input type="radio" value={product.name} />
                    <p>{product.name}</p>
                  </div>
                )}
              </>
            ))}
            <button>OK</button>
        </div>
      )}
      {!accompaniments && (
        <>
          <div className={styles.image}>
            <img src={individualProduct.url} alt={individualProduct.name} />
          </div>
          <div className={styles.productDetails}>
            <span className={styles.name}>{individualProduct.name}</span>
          </div>
          <label className={styles.description}>
            {individualProduct.description}
          </label>
          <span className={styles.price}>R${price}</span>
          {individualProduct.accompaniments === "SIM" && (
            <button onClick={() => setAccompaniments(!accompaniments)}>
              Escolher Acompanhamentos
            </button>
          )}

          <button className={styles.addToCart} onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
