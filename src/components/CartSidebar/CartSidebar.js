import styles from "./CartSidebar.module.css";
import ProductList from "../Products/ProductList/ProductList";

import NavLinkButton from "../Button/NavLinkButton";
import { FaSave } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const CartSidebar = ({ isOpen, onClick }) => {
  //const services
  const { user } = useAuthValue();

  const [cancelled, setCancelled] = useState(false);
  //const User
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  //constCart
  const [cartProducts, setCartProducts] = useState([]);
  const { documents } = useFetchDocuments(`Cart ${user.uid}`);

  useEffect(() => {
    if (user) {
      setUserUid(user.uid);
      setUserName(user.displayName);
    }

    if (documents) {
      setCartProducts(documents);
    }
  }, [user, documents]);


  if (isOpen) {
    return (
      <div className={styles.background}>
        <div className={styles.modal}>
          <div className={styles.shoppingCart}>
            <h3>Carrinho de Compras</h3>

            <div className={styles.productsList}>
              {cartProducts &&
                cartProducts.map((cartProduct) => (
                  <ProductList cartProduct={cartProduct} button={true}  key={cartProduct.id} />
                ))}
            </div>
          </div>
          <div className={styles.total}>
            <span>TOTAL</span>
            <span>R$ 15,00</span>
          </div>
          <div className={styles.button}>
            <NavLinkButton
              onClick={onClick}
              Text="FINALIZAR COMPRA"
              Icon={FaSave}
            ></NavLinkButton>
          </div>
        </div>
      </div>
    );
  }
};

export default CartSidebar;
