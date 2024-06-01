import { useUpdateDocument } from "../../../hooks/useUpdateDocument";
import { useAuthValue } from "../../../context/AuthContext";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";
import { useInsertDocument } from "../../../hooks/useInsertDocuments";
import Accompaniments from "../Accompaniments/Accompaniments";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";
import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "./ProductList.module.css";
import { useEffect, useState } from "react";

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
  const { updateDocument } = useUpdateDocument(`Cart ${uid}`);
  const { deleteDocument } = useDeleteDocument(`Cart ${uid}`);
  const [accompaniments, setAccompaniments] = useState(false);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const { insertCart } = useInsertDocument(`Cart ${uid}`);
  const [accompanimentQty, setAccompanimentQty] = useState([]);
  const [id, setId] = useState("");
  const [moreAccompanimentsProduct, setMoreAccompanimentsProduct] =
    useState(false);
  const existCart = [];
  const existCartName = [];
  const existSameProduct = [];

  if (cart) {
    cart.map((products) => {
      if (products.product.accompaniments === "SIM") {
        existCartName.push(products.product.name);
      }
      return existCartName;
    });
    cart.map((products) => existCart.push(products.id));
    cart.map((products) => existSameProduct.push(products.product.id));
  }

  useEffect(() => {
    if (cartProduct) {
      setPrice(cartProduct.totalPrice);
      setQty(cartProduct.qty);
      setId(cartProduct.id);
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

  const handleCartProductIncrease = () => {
    const qtyProduct = qty + 1;
    const productPrice = parseFloat(cartProduct.product.price);
    const total = qtyProduct * productPrice;
    const totalProductPrice = total.toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
    setQty(qtyProduct);
    setPrice(totalProductPrice);

    const data = { qty: qtyProduct, totalPrice: totalProductPrice };
    updateDocument(cartProduct.id, data);
  };

  const handleCartProductDecrease = () => {
    if (cartProduct.qty > 1) {
      const qtyProduct = qty - 1;
      const productPrice = parseFloat(cartProduct.product.price);
      const total = qtyProduct * productPrice;
      const totalProductPrice = total.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      setPrice(totalProductPrice);
      setQty(qtyProduct);
      // console.log(totalProductPrice);

      const data = { qty: qtyProduct, totalPrice: totalProductPrice };
      updateDocument(cartProduct.id, data);
    }
  };

  const handleSaveCartProductIncrease = () => {
    setQty(1)
    const count = existSameProduct.reduce((acc, num) => {
      if (num === cartProduct.product.id) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const idSaveProduct = `${cartProduct.product.id}.${count}`;
    const product = {
      accompaniments: cartProduct.product.accompaniments,
      branchName: cartProduct.product.branchName,
      createAt: cartProduct.product.createAt,
      description: cartProduct.product.description,
      id: cartProduct.product.id,
      name: cartProduct.product.name,
      price: cartProduct.product.price,
      state: cartProduct.product.state,
      url: cartProduct.product.url,
    };
    const accompaniment = [];
    const totalPrice = cartProduct.product.price;
    insertCart(idSaveProduct, {
      uid,
      product,
      qty:1,
      totalPrice,
      accompaniments: accompaniment,
    });
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
    // console.log(array);

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

    const accompaniments = countItems(accompanimentQty);

    // console.log(accompaniments);

      const data = { accompaniments };
      updateDocument(cartProduct.id, data);
      
    

    setAccompaniments(false);
    setAccompanimentQty([]);
  };

  return (
    <div key={cartProduct.id}>
      <div className={styles.productList}>
        <div className={styles.image}>
          <img src={cartProduct.product.url} alt={cartProduct.product.name} />
        </div>
        {cartProduct.product.accompaniments === "SIM" && (
          <>
            <div className={styles.productDetails} key={cartProduct.id}>
              <div className={styles.name} key={cartProduct.id}>
                <span>{cartProduct.product.name}</span>
                <button
                  className={styles.addButton}
                  onClick={handleSaveCartProductIncrease}
                >
                  Adicionar item com acompanhamentos diferentes?
                </button>
              </div>
              <div className={styles.accompaniment}>
                {cartProduct.accompaniments.length > 0 && (
                  <div key={cartProduct.id}>
                    <ul>
                      {cartProduct.accompaniments.map(
                        (accompanimentChoiced, index) => (
                          <li key={index}
                          >
                            {accompanimentChoiced.accompaniment}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                <>
                  {button && (
                    <>
                      {!accompaniments && (
                        <>
                          {existCart.includes(cartProduct.id) && (
                            <>
                              {cartProduct.accompaniments.length > 0 ? (
                                <button
                                  className={styles.addButton}
                                  onClick={() => setAccompaniments(true)}
                                >
                                  Alterar Acompanhamentos
                                </button>
                              ) : (
                                <button
                                  className={styles.addButton}
                                  onClick={() => setAccompaniments(true)}
                                >
                                  Escolha 3 Acompanhamentos
                                </button>
                              )}
                            </>
                          )}
                        </>
                      )}

                      {accompaniments && (
                        <div className={styles.accompanimentsBox}>
                          <div className={styles.navAccompaniments}>
                            <span>Escolha 3 Acompanhamentos</span>
                            <button onClick={handleProductAccompaniments}>
                              OK
                            </button>
                            <button onClick={() => setAccompaniments(false)}>
                              Fechar
                            </button>
                          </div>

                          <div className={styles.accompanimentsOverflow}>
                            {existAccompaniments &&
                              existAccompaniments.map((accompaniment) => (
                                <div
                                  className={styles.accompanimentsList}
                                  key={accompaniment.id}
                                >
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
                                      !accompanimentQty.includes(
                                        accompaniment.name
                                      ) && accompanimentQty.length > 2
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
              </div>
            </div>
            <div className={styles.productButton}>
              
              <div className={styles.buttons}>
              <span className={styles.price}>R${price}</span>
                {moreAccompanimentsProduct ? (
                  <div className={styles.add}>
                    <FaPlus onClick={handleCartProductIncrease} />
                    <span>{qty}</span>
                    <FaMinus onClick={handleCartProductDecrease} />
                  </div>
                ) : (
                  <>
                    {cartProduct.qty > 1 ? (
                      <div className={styles.add}>
                        <FaPlus onClick={handleCartProductIncrease} />
                        <span>{qty}</span>
                        <FaMinus onClick={handleCartProductDecrease} />
                      </div>
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => setMoreAccompanimentsProduct(true)}
                      >
                        Adicionar item com os mesmos acompanhamentos?
                      </button>
                    )}
                  </>
                )}
                <div className={styles.delete}>
                  <button onClick={() => deleteDocument(cartProduct.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <>
          {cartProduct.product.accompaniments !== "SIM" && (
            <>
              <div className={styles.productDetails} key={cartProduct.id}>
                <div className={styles.name}>
                  <span>{cartProduct.product.name}</span>
                </div>
              </div>

              <div className={styles.productButton}>
                <div className={styles.buttons}>
                  <span className={styles.price}>R${price}</span>
                  <div className={styles.add}>
                    <FaPlus onClick={handleCartProductIncrease} />
                    <span>{qty}</span>
                    <FaMinus onClick={handleCartProductDecrease} />
                  </div>

                  <div className={styles.delete}>
                    <button onClick={() => deleteDocument(id)}>Excluir</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default ProductList;
