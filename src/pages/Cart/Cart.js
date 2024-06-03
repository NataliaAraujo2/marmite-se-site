import styles from "./Cart.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import ProductList from "../../components/Products/ProductList/ProductList";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";


const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPEKEY}`
);


const Cart = () => {
  //const services
  const { user } = useAuthValue();
  const uid = user.uid;
  const key = process.env.REACT_APP_STRIPE_KEY;
  const publicKey = process.env.REACT_APP_STRIPEPUBLICKE
  const secretKey=process.env.REACT_APP_STRIPEKEY

  console.log(publicKey)
  console.log(secretKey)

  const options = {
    // passing the client secret obtained from the server
    clientSecret: key,
  };

  //constCart
  const { documents: cart } = useFetchDocuments(`Cart ${uid}`);

  //getting the qty from Cart in a separate array
  const qty = cart.map((cartProduct) => {
    return cartProduct.qty;
  });
  // console.log(qty);

  //reducing the qty in a single value
  const reducerOfQty = (acc, currentValue) => acc + currentValue;
  const totalQty = qty.reduce(reducerOfQty, 0);
  // console.log(totalQty)

  //getting the totalPrice from Cartina a separate array
  const price = cart.map((cartProduct) => {
    return parseFloat(cartProduct.totalPrice);
  });

  //reducing the totalPrice in a single value
  const reducerOfPrice = (acc, currentValue) => acc + currentValue;
  const totalCartPrice = price.reduce(reducerOfPrice, 0);
  const totalCartPriceString = totalCartPrice.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <div className={styles.cart}>
      <h3>CARRINHO DE COMPRAS</h3>
      <div className={styles.shoppingCart}>
        <div className={styles.productsList}>
          {cart &&
            cart.map((cartIndividualProduct) => (
              <div key={cartIndividualProduct.id}>
                <ProductList
                  cartProduct={cartIndividualProduct}
                  button={true}
                  key={cartIndividualProduct.id}
                />
              </div>
            ))}
        </div>
        <div className={styles.productsResume}>
          <h1>RESUMO</h1>
          <div className={styles.totalProducts}>
            <h2>
              Total de Produtos: <span>{totalQty}</span>
            </h2>
          </div>
          <div className={styles.totalPrice}>
            <h2>
              Preço Total <span>R${totalCartPriceString}</span>
            </h2>
          </div>
          <span>
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckout stripeKey={publicKey} token={secretKey}></StripeCheckout>
            </Elements>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
