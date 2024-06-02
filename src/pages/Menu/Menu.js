import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Menu = () => {
  const state = "ATIVO";
  const { documents: branchs } = useFetchDocuments("branchs", null, state);
  const { documents: products } = useFetchDocuments("products", null, state);
  const [open200, setOpen200] = useState(false);
  const [open300, setOpen300] = useState(false);
  const [open400, setOpen400] = useState(false);
  const [open500, setOpen500] = useState(false);
  const [open250, setOpen250] = useState(false);
  const [open500No, setOpen500No] = useState(false);
  const [openCoffee, setOpenCoffee] = useState(false);
  const [openPocket, setOpenPocket] = useState(false);
  const [openFrozen, setOpenFrozen] = useState(false);
  const [openDesserts, setOpenDesserts] = useState(false);
  const [openPies, setOpenPies] = useState(false);
  const [openBroths, setOpenBroths] = useState(false);

  const [uid, setUid] = useState(null);
  
  const [existProduct, setExistProduct] = useState([]);
  const { user } = useAuthValue();

  const navigate = useNavigate();
  const { insertCart } = useInsertDocument(`Cart ${uid}`);

  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (user) {
      setUid(user.uid);
    }

   
    if (products) {
      const sortProductsName = products.sort(compare);
      setExistProduct(sortProductsName);
    }
  }, [branchs, products, user]);



  const addToCart = async (product) => {
    if (uid !== null) {
      const id = `${product.id}`;
      const qty = 1;
      const calcTotalPrice = product.price * qty;
      const totalPrice = calcTotalPrice.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      const accompaniments = [];

      insertCart(id, {
        uid,
        qty,
        totalPrice,
        product,
        accompaniments,
      });

      console.log("Sucess");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.menu}>
      <div className={styles.tittle}>
        <h3>MARMITAS</h3>
        {openPocket ? (
          <FaArrowUp onClick={() => setOpenPocket(!openPocket)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenPocket(!openPocket)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openPocket && (
          <>
            <div className={styles.accompaniments}>
              <span>Com Acompanhamentos</span>
              <>
                <div className={styles.classPocket}>
                  <span>200G </span>
                  {open200 ? (
                    <FaArrowUp onClick={(e) => setOpen200(!open200)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen200(!open200)} />
                  )}
                </div>
                {open200 && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("200G") &&
                            product.accompaniments === "SIM" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </>
              <>
                <div className={styles.classPocket}>
                  <span>300G </span>
                  {open300 ? (
                    <FaArrowUp onClick={(e) => setOpen300(!open300)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen300(!open300)} />
                  )}
                </div>
                {open300 && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("300G") &&
                            product.accompaniments === "SIM" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </>
              <>
                <div className={styles.classPocket}>
                  <span>400G </span>
                  {open400 ? (
                    <FaArrowUp onClick={(e) => setOpen400(!open400)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen400(!open400)} />
                  )}
                </div>
                {open400 && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("400G") &&
                            product.accompaniments === "SIM" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </>
              <>
                <div className={styles.classPocket}>
                  <span>500G </span>{" "}
                  {open500 ? (
                    <FaArrowUp onClick={(e) => setOpen500(!open500)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen500(!open500)} />
                  )}
                </div>
                {open500 && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("500G") &&
                            product.accompaniments === "SIM" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </>
            </div>
            <div className={styles.accompaniments}>
              <span>Apenas o Prato Principal</span>
              <>
                <div className={styles.classPocket}>
                  <span>250G </span>
                  {open200 ? (
                    <FaArrowUp onClick={(e) => setOpen250(!open250)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen250(!open250)} />
                  )}
                </div>
                {open250 && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("250G") &&
                            product.accompaniments === "NÃO" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
                <div className={styles.classPocket}>
                  <span>500G </span>
                  {open200 ? (
                    <FaArrowUp onClick={(e) => setOpen500No(!open500No)} />
                  ) : (
                    <FaArrowDown onClick={(e) => setOpen500No(!open500No)} />
                  )}
                </div>
                {open500No && (
                  <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.name.includes("500G") &&
                            product.accompaniments === "NÃO" && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </>
            </div>
          </>
        )}
      </div>
      <div className={styles.tittle}>
        <h3>CALDOS E SOPAS</h3>
        {openBroths ? (
          <FaArrowUp onClick={() => setOpenBroths(!openBroths)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenBroths(!openBroths)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openBroths && (   <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.branchName === "Caldos e Sopas"  && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>)}
        
               
      </div>
      <div className={styles.tittle}>
        <h3>CONGELADOS</h3>
        {openFrozen ? (
          <FaArrowUp onClick={() => setOpenFrozen(!openFrozen)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenFrozen(!openFrozen)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openFrozen && (   <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.branchName === "Congelados"  && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>)}
        
               
      </div>
      <div className={styles.tittle}>
        <h3>COFFEE-BREAK</h3>
        {openCoffee ? (
          <FaArrowUp onClick={() => setOpenCoffee(!openCoffee)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenCoffee(!openCoffee)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openCoffee && (   <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.branchName === "Coffee-Break"  && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>)}
        
               
      </div>
      <div className={styles.tittle}>
        <h3>SOBREMESAS</h3>
        {openDesserts ? (
          <FaArrowUp onClick={() => setOpenDesserts(!openDesserts)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenDesserts(!openDesserts)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openDesserts && (   <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.branchName === "Sobremesas"  && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>)}
        
               
      </div>
      <div className={styles.tittle}>
        <h3>TORTAS</h3>
        {openPies ? (
          <FaArrowUp onClick={() => setOpenPies(!openPies)}></FaArrowUp>
        ) : (
          <FaArrowDown onClick={() => setOpenPies(!openPies)}></FaArrowDown>
        )}
      </div>
      <div className={styles.productList}>
        {openPies && (   <div className={styles.productsList200}>
                    {existProduct &&
                      existProduct.map((product) => (
                        <div key={product.id}>
                          {product.branchName === "Tortas"  && (
                              <ProductCard
                                individualProduct={product}
                                addToCart={addToCart}
                              />
                            )}
                        </div>
                      ))}
                  </div>)}
        
               
      </div>
    
 
    </div>
  );
};

export default Menu;
