import styles from "./ProductList.module.css";
import React from "react";

const ProductList = ({
  cartProduct,
  button = null,
}) => {

  let Product;
  const handleCartProductIncrease = () => {
    Product=cartProduct;
    Product.qty=Product.Product.qty+1
    Product.TotalProductPrice=Product.qty*Product.Product.price

    
  };

  const handleCartProductDecrease = () => {
 
  };

  return (
    <div className={styles.productImage}>
      <div className={styles.image}>
        <img src={cartProduct.Product.url} alt={cartProduct.Product.name} />
      </div>

      <div className={styles.details}>
        <span className={styles.name}>{cartProduct.Product.name}</span>
        <span className={styles.price}>R${cartProduct.Product.price}</span>
      </div>

      {button && (
        <div className={styles.add}>
          <button onClick={handleCartProductIncrease}>+</button>
          <span>{cartProduct.Product.qty}</span>
          <button className={styles.minus} onClick={handleCartProductDecrease}>
            -
          </button>
          <div className={styles.delete}>
          <button>Excluir</button>
          </div>
         
        </div>

        
      )}
    </div>
  );
};

export default ProductList;
