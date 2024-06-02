import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import styles from "./Store.module.css";
import DisplayProducts from "../../components/DisplayProducts/DisplayProducts";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import { useNavigate } from "react-router-dom";

const CoffeeStore = () => {
  const state = "ATIVO";
  const { documents: products } = useFetchDocuments("products", null, state);
  const { documents: branchs } = useFetchDocuments("branchs", null, state);
  const [existProduct, setExistProduct] = useState([]);
  const branchName = "Coffee-Break";
  const { user } = useAuthValue();
  const [uid, setUid] = useState(null);
  const { insertCart } = useInsertDocument(`Cart ${uid}`);
  const navigate= useNavigate()


  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if(user) {
      setUid(user.uid)
    }
    if (products) {
      const sortProductsName = products.sort(compare);
      setExistProduct(sortProductsName);
    }
  }, [products, user]);

  const addToCart = async (product) => {
    if (uid !== null) {
      const id = `${product.id}`;
      const qty = 1;
      const calcTotalPrice = product.price * qty;
      const totalPrice = calcTotalPrice.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      const accompaniments=[]
      
      insertCart(id, {
        uid,
        qty,
        totalPrice,
        product,
        accompaniments
      });

      // console.log("Sucess");
    } else {
      navigate("/login");
    }
  };


  return (
    <div className={styles.store}>
      <DisplayProducts url="store" />
      {branchs &&
        branchs.map((branch) => (
          <div key={branch.id}>
            {branch.name === branchName && (
              <div className={styles.description}>
                <span>{branch.description}</span>
              </div>
            )}
          </div>
        ))}

      <div className={styles.productsList}>
        {existProduct &&
          existProduct.map((product) => (
            <div key={product.id}>
              {product.branchName === branchName && (
                <ProductCard individualProduct={product} addToCart={addToCart} />
              )}
            </div>
          ))}
      </div>
    </div>

  );
};

export default CoffeeStore;
