import styles from "./ProductList.module.css";
import React, { useEffect, useState } from "react";
import { useUpdateDocument } from "../../../hooks/useUpdateDocument";
import { useAuthValue } from "../../../context/AuthContext";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";
import { useInsertDocument } from "../../../hooks/useInsertDocuments";
import Accompaniments from "../Accompaniments/Accompaniments";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductList = ({ cartProduct, button = null }) => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const branchName = "Acompanhamentos";
  const { documents: cart } = useFetchDocuments(`Cart ${uid}`);
  const { documents: accompanimentsList } = useFetchDocuments(
    "products",
    null,
    null,
    branchName
  );

  const [existAccompaniments, setExistAccompaniments] = useState([]);
  const { deleteDocument } = useDeleteDocument(`${uid}`);
  const [accompaniments, setAccompaniments] = useState(false);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const { insertCart } = useInsertDocument(`Cart ${uid}`);
  const [accompanimentQty, setAccompanimentQty] = useState([]);
  const [id, setId] = useState("");
  const existCart = [];

  if (cart) {
    cart.map((products) => existCart.push(products.cartProduct.id));
  }

  console.log(existCart);
  useEffect(() => {
    if (cartProduct) {
      setPrice(cartProduct.product.price);
      setId(cartProduct.product.id);
    }
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (accompanimentsList) {
      const sortAccompanimentsName = accompanimentsList.sort(compare);
      setExistAccompaniments(sortAccompanimentsName);
    }
  }, [accompanimentsList, cartProduct]);

  useEffect(() => {
    const productCartInclude = existCart.includes(cartProduct.id);
    if (cartProduct.product.accompaniments !== "SIM" && !productCartInclude) {
      const priceProduct = cartProduct.product.price;
      const id = `${cartProduct.id} `;
      insertCart(id, {
        cartProduct,
        price: priceProduct,
        qty,
      });
    }
  }, [qty, price, cartProduct, existCart, insertCart]);

  async function increase () {
      const qtyProduct = qty + 1;
      const productPrice = cartProduct.product.price;
      const total = qtyProduct * productPrice;
      const totalProductPrice = total.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
     await setQty(qtyProduct);
     await setPrice(totalProductPrice);
  }

  const handleCartProductIncrease = async () => {
    if (cartProduct.product.accompaniments === "SIM") {
      increase()
      setAccompaniments(true);
    }

    const productCartInclude = existCart.includes(cartProduct.id);
    if (cartProduct.product.accompaniments !== "SIM" && productCartInclude) {
     increase()
     const productQtyCartInclude = 1
     const qytTotal = productQtyCartInclude+qty 
      const id = `${cartProduct.id} `;
      insertCart(id, {
        cartProduct,
        price,
        qty: qytTotal,
      });
    }
  };

  const handleCartProductDecrease = () => {
    if (cartProduct.qty > 1) {
      const qtyProduct = qty + 1;
      const productPrice = cartProduct.product.price;
      const total = qtyProduct * productPrice;
      const totalProductPrice = total.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      setPrice(totalProductPrice);
      setQty(qtyProduct);
      console.log(totalProductPrice);
    }
  };

  function handleChangeAccompaniments(event) {
    const { value, checked } = event.target;

    if (checked) {
      setAccompanimentQty((pre) => [...pre, value]);
    } else {
      setAccompanimentQty((pre) => [
        ...pre.filter((product) => product !== value),
      ]);
    }
  }

  const handleIncreaseQtyAccompaniments = (data) => {
    if (accompanimentQty.length < 3) {
      setAccompanimentQty((pre) => [...pre, data]);
    }
  };

  const handleDecreaseQtyAccompaniments = (data) => {
    const filterArray = accompanimentQty.filter(function (accompaniment) {
      if (accompaniment === data) {
        return true;
      } else {
        return false;
      }
    });

    filterArray.pop();

    const array = accompanimentQty.filter((product) => product !== data);
    console.log(array);

    setAccompanimentQty(array.concat(filterArray));
  };

  const handleProductAccompaniments = () => {
    console.log(accompanimentQty);
    function countItems(arr) {
      const countMap = Object.create(null);

      for (const element of accompanimentQty) {
        // Basicamente, estamos dizendo: atribua à `countMap[element]` o valor
        // atual (ou zero, caso não existir) somado ao número 1.
        countMap[element] = (countMap[element] || 0) + 1;
      }

      return Object.entries(countMap).map(([value, count]) => ({
        accompaniment: value,
        qty: count,
      }));
    }

    const accompaniment = countItems(accompanimentQty);

    console.log(accompaniment);

    const id = `${cartProduct.id}.${accompanimentQty} `;
    insertCart(id, {
      cartProduct,
      price,
      qty,
      accompaniment,
    });
    setAccompaniments(false);
    setAccompanimentQty([]);
  };

  return (
    <div className={styles.productList}>
      <div className={styles.image}>
        <img src={cartProduct.product.url} alt={cartProduct.product.name} />
      </div>
      <span className={styles.name}>{cartProduct.product.name}</span>

      {cartProduct.product.accompaniments === "SIM" && (
        <>
          {button && (
            <>
              {!accompaniments && (
                <>
                  {existCart.includes(cartProduct.id) ? (
                    <>
                      {" "}
                      <span className={styles.price}>R${price}</span>
                      <div className={styles.buttons}>
                        <div className={styles.add}>
                          <FaPlus onClick={handleCartProductIncrease} />
                          <span>{qty}</span>
                          <FaMinus onClick={handleCartProductDecrease} />
                        </div>

                        <div className={styles.delete}>
                          <button onClick={() => deleteDocument(id)}>
                            Excluir
                          </button>
                        </div>
                      </div>{" "}
                    </>
                  ) : (
                    <>
                      <span className={styles.price}>R${price}</span>
                      <div className={styles.buttons}>
                        <button onClick={() => setAccompaniments(true)}>
                          Escolha 3 Acompanhamentos
                        </button>
                        <div>
                          <button onClick={() => deleteDocument(id)}>
                            Excluir
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {accompaniments && (
                <div className={styles.accompanimentsBox}>
                  <div className={styles.navAccompaniments}>
                    <span>Escolha 3 Acompanhamentos</span>
                    <button onClick={handleProductAccompaniments}>OK</button>
                  </div>

                  <div className={styles.accompanimentsOverflow}>
                    {existAccompaniments &&
                      existAccompaniments.map((accompaniment) => (
                        <div className={styles.accompanimentsList}>
                          <Accompaniments
                            accompaniments={accompaniment}
                            handleChangeAccompaniments={
                              handleChangeAccompaniments
                            }
                            handleIncreaseQtyAccompaniments={
                              handleIncreaseQtyAccompaniments
                            }
                            handleDecreaseQtyAccompaniments={
                              handleDecreaseQtyAccompaniments
                            }
                            disabled={
                              !accompanimentQty.includes(accompaniment.name) &&
                              accompanimentQty.length > 2
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {cartProduct.product.accompaniments !== "SIM" && (
        <>
          {" "}
          <span className={styles.price}>R${price}</span>
          <div className={styles.buttons}>
            <div className={styles.add}>
              <FaPlus onClick={handleCartProductIncrease} />
              <span>{qty}</span>
              <FaMinus onClick={handleCartProductDecrease} />
            </div>

            <div className={styles.delete}>
              <button onClick={() => deleteDocument(id)}>Excluir</button>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default ProductList;
