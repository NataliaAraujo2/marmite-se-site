import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const PayPalCheckoutButtons = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleApprove = (orderId) => {
    //Call backend function to fulfill order

    //if response is success
    setPaidFor(true);
    //Refresh user account

    //if the response is error
    //setError("your payment was processed successfuly. However, we are unable to fulfill your purchase.")
  };

  if (paidFor) {
    //page success
    alert("Obrigado pela sua compra");
  }

  if (error) {
    alert(error);
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: product.description,
          amount: { currency_code: "BRL", value: product.price },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log("order", order);
    handleApprove(data.orderID);
  };

  const onCancel = () => [navigate(`cart/Cart ${user.uid}`)];

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={onCancel}
      onError={(err) => {
        setError(err);
        console.error("PayPAl", err);
      }}
    />
  );
};

export default PayPalCheckoutButtons;
