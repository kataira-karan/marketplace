import { React, useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./StripeStyle.css";
import { useHistory } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = (props) => {
  const { item, userId } = props;
  const history = useHistory();
  console.log(item);
  const [success, setsuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    console.log("ss");
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(error);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const requestOptions = {
          crossDomain: true,
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: item.price * 100,
            id: id,
            product: item,
            userId: userId,
          }),
        };
        await fetch("http://localhost:8080/payment", requestOptions)
          .then((response) => {
            console.log(response);

            return response.json();
          })
          .then((data) => {
            if (data.success) {
              setsuccess(true);
              history.push("/");
            } else {
              console.log(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldset>
          <button className="payment-button" onClick={handleSubmit}>
            {" "}
            Pay{" "}
          </button>
        </form>
      ) : (
        <h2> Purchase success</h2>
      )}
    </>
  );
};

export default PaymentForm;
