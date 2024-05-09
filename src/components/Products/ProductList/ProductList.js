import styles from "./ProductList.module.css";
import React, { useEffect, useState } from "react";
import { useUpdateDocument } from "../../../hooks/useUpdateDocument";
import { useAuthValue } from "../../../context/AuthContext";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";

const ProductList = ({ cartProduct, button = null }) => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { updateDocument } = useUpdateDocument(`Cart ${uid}`);
  const { deleteDocument } = useDeleteDocument(`Cart ${uid}`);
  const [price, setPrice] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [accompaniments, setAccompaniments] = useState([]);

  useEffect(() => {
    if (cancelled) return;

    if (cartProduct) {
      setPrice(cartProduct.totalProductPrice);
      setAccompaniments(cartProduct.accompaniments);
    }

    return () => {
      if (price) {
        setCancelled(true);
      }
    };
  }, [cartProduct, price, cancelled]);

  const handleCartProductIncrease = () => {
    const qty = parseInt(cartProduct.qty) + 1;
    const total = qty * cartProduct.product.price;
    const totalProductPrice = total.toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
    setPrice(totalProductPrice);

    const data = {
      qty,
      totalProductPrice,
    };

    console.log(totalProductPrice);
    const id = `${cartProduct.product.id}.${accompaniments}`

    updateDocument(id, data);
  };

  const handleCartProductDecrease = () => {
    if (cartProduct.qty > 1) {
      const qty = parseInt(cartProduct.qty) - 1;
      const total = qty * cartProduct.product.price;
      const totalProductPrice = total.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      setPrice(totalProductPrice);
      const data = {
        qty,
        totalProductPrice,
      };

      const id = `${cartProduct.product.id}.${accompaniments}`
      updateDocument(id, data);
      console.log(totalProductPrice);
    }
  };

  return (
    <div className={styles.productImage}>
      <div className={styles.image}>
        <img src={cartProduct.product.url} alt={cartProduct.product.name} />
      </div>

      <div className={styles.details}>
        <div className={styles.productDetails}>
          <span className={styles.name}>{cartProduct.product.name}</span>
          {accompaniments.length > 0 && (
            <span className={styles.accompaniments}>
              Acompanhamentos: {cartProduct.accompaniments[0]},
              {cartProduct.accompaniments[1]}, {cartProduct.accompaniments[2]}
            </span>
          )}
        </div>
        <span className={styles.price}>R${cartProduct.totalProductPrice}</span>
      </div>

      {button && (
        <div className={styles.add}>
          <button onClick={handleCartProductIncrease}>+</button>
          <span>{cartProduct.qty}</span>
          <button className={styles.minus} onClick={handleCartProductDecrease}>
            -
          </button>
          <div className={styles.delete}>
            <button onClick={() => deleteDocument(cartProduct.product.id)}>
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
