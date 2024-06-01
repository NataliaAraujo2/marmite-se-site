import styles from "./Cart.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import ProductList from "../../components/Products/ProductList/ProductList";

const Cart = () => {
  //const services
  const { user } = useAuthValue();
  const uid = user.uid;

  //constCart
  const { documents } = useFetchDocuments(`Cart ${uid}`);

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.productsList}>
        <h3>Carrinho de Compras</h3>
        

        {documents &&
          documents.map((cartIndividualProduct) => (
            <div key={cartIndividualProduct.id}>
       

                <ProductList
                  cartProduct={cartIndividualProduct}
                  button={true}
                  key={cartIndividualProduct.id}
                />
              
            
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
