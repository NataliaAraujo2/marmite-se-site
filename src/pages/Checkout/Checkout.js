//css
import styles from "./Checkout.module.css";
import ProductList from "../../components/Products/ProductList/ProductList";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import PayPalCheckoutButtons from "../../components/PaypalCheckoutButtons/PayPalCheckoutButtons";
import { useState } from "react";

const Checkout = () => {
  //const hooks
  const { user } = useAuthValue();
  const { documents: cartProducts } = useFetchDocuments(`Cart ${user.uid}`);
const [total, setTotal] = useState(0)
  

  //const payment
  const product = {
    description: "Designer",
    price: 19.5,
  };

  const priceReplace = cartProducts.map((cartProduct) => {
    return cartProduct.totalPrice.replace(',', '.');
  });

  //getting the totalPrice from Cartina a separate array
  const price = cartProducts.map((cartProduct) => {
    return parseFloat(priceReplace);
  });

  //reducing the totalPrice in a single value
  const reducerOfPrice = (acc, currentValue) => acc + currentValue;
  const totalCartPrice = price.reduce(reducerOfPrice, 0);
  const totalCartPriceStringParcial = totalCartPrice.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
 
  const frete = totalCartPrice * 0.05;
  const freteString = frete.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });


  if(frete > 0.009) {
    const totalCalc = frete + totalCartPrice;
    setTotal(totalCalc)
  } else {
    setTotal(totalCartPrice)
  }

 
  const totalCartPriceString = total.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  //getting the qty from Cart in a separate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });
  // console.log(qty);

  //reducing the qty in a single value
  const reducerOfQty = (acc, currentValue) => acc + currentValue;
  const totalQty = qty.reduce(reducerOfQty, 0);

  // console.log(totalQty)

  return (
    <div className={styles.checkout}>
      <div className={styles.deliveryForm}>
        <h3>Resumo para Pagamento</h3>
          <h5>Total de Produtos no Carrinho: {totalQty}</h5>
          <h5>Valor do Frete R${freteString}</h5>
          <h5>Valor Total dos Produtos R${totalCartPriceStringParcial}</h5>
          <h5>Valor Total para Pagamento R${totalCartPriceString}</h5>
  
          <PayPalCheckoutButtons product={product} />
 
      </div>

      <div className={styles.shoppingCart}>
        <h3>
          Minha Sacola 
        </h3>
        <div className={styles.productsList}>
          {cartProducts &&
            cartProducts.map((cartIndividualProduct) => (
              <div key={cartIndividualProduct.id}>
                <ProductList
                  cartProduct={cartIndividualProduct}
                  button={false}
                  key={cartIndividualProduct.id}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
