import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Menu = () => {
  const state = "ATIVO";
  const { documents: branchs } = useFetchDocuments("branchs", null, state);
  const { documents: products } = useFetchDocuments("products", null, state);
  const [existBranch, setExistBranch] = useState([]);
  const [existProduct, setExistProduct] = useState([]);

  useEffect(() => {
    if (branchs) {
      const branchsNames = branchs.map(function (branch) {
        return branch.branchName;
      });

      const sortBranchsNames = branchsNames.sort(Intl.Collator().compare);
      setExistBranch(sortBranchsNames);
    }
    function compare(a, b) {
      if (a.productName < b.productName) return -1;
      if (a.productName > b.productName) return 1;
      return 0;
    }
    if (products) {
      const sortProductsName = products.sort(compare);
      setExistProduct(sortProductsName);
    }
  }, [branchs, products]);

  return (
    <div className={styles.menu}>
      {existBranch &&
        existBranch.map((branch) => (
          <div className={styles.products} key={branch}>
            <div className={styles.tittle}>
              <h3>{branch}</h3>
            </div>
            <div className={styles.productsList}>
              {existProduct &&
                existProduct.map((product) => (
                  <>
                    {product.branchName === branch && (
                      <ProductCard
                        src={product.url}
                        name={product.productName}
                        price={product.price}
                        description={product.description}
                      />
                    )}
                  </>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Menu;
