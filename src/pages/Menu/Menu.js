import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocuments";


const Menu = () => {
  const state = "ATIVO";
  const { documents: branchs } = useFetchDocuments("branchs", null, state);
  const { documents: products } = useFetchDocuments("products", null, state);
  
  const [uid, setUid] = useState(null);
  const [existBranch, setExistBranch] = useState([]);
  const [existProduct, setExistProduct] = useState([]);
  const { user } = useAuthValue();

  const navigate = useNavigate();
  const { insertCart } = useInsertDocument(`${uid}`);

  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (user) {
      setUid(user.uid);
    }

    if (branchs) {
      const sortBranchsName = branchs.sort(compare);
      setExistBranch(sortBranchsName);
    }

    if (products) {
      const sortProductsName = products.sort(compare);
      setExistProduct(sortProductsName);
    }

  }, [branchs, products, user]);




  const addToCart = async(product) => {
    if (uid !== null) {

      const id = `${product.id}`;
      
      insertCart(id, {
        uid,
        product
      });


      console.log("Sucess");
    } else {
      navigate("/login");
    }

    console.log(document)
  };

  

  return (
    <div className={styles.menu}>
  
      {existBranch &&
        existBranch.map((branch) => (
          <div key={branch.id}>
            <div className={styles.tittle}>
              <h3>{branch.name}</h3>
            </div>
            <div className={styles.productsList}>
              {existProduct &&
                existProduct.map((product) => (
                  <div key={product.id}>
                    {product.branchName === branch.name && (
                      <ProductCard
                        individualProduct={product}
                        addToCart={addToCart}
                     
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
    
    </div>
  );
};

export default Menu;
