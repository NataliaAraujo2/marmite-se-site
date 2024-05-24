import styles from "./Cart.module.css";
import ProductList from "../../components/Products/ProductList/ProductList";

import NavLinkButton from "../../components/Button/NavLinkButton";
import { FaSave } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Cart = ({ onClick }) => {
  //const services
  const { user } = useAuthValue();
  const uid = user.uid;

  //constCart

  const { documents } = useFetchDocuments(`${user.uid}`, uid);


  return (
    <div className={styles.shoppingCart}>
      <div className={styles.productsList}>
        <h3>Carrinho de Compras</h3>
        {documents &&
          documents.map((cartProduct) => (
            <ProductList
              cartProduct={cartProduct}
              button={true}
              key={cartProduct.id}
            />
          ))}
      </div>

      <div className={styles.productsResume}>
        <h2>RESUMO</h2>
        <div>
          <span>Quantidade de Produtos: 100</span>
        </div>
        <div className={styles.total}>
          <span>TOTAL</span>
          <span>R$ 15,00</span>
        </div>
        <div className={styles.button}>
          <NavLinkButton
            onClick={onClick}
            Text="Confirmar"
            Icon={FaSave}
          ></NavLinkButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
