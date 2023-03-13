import { React, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import ProductCard from "../../Component/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import "./StripeStyle.css";
import Navigation from "../../Component/Navigation/Navigation";

const PUBLIC_KEY =
  "pk_test_51MCmyoDMZ0iV8W3mblpHaEa40o6YSvrybbjAnIx5TGvCOCshkhXbW2Zrj3lSiKFRt4CZe9Rl7ngwYEfNPannAZ4T003spdz3VA";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
  const location = useLocation();
  const [item, setitem] = useState(location.state.product);

  console.log(location);
  return (
    <>
      <Navigation></Navigation>

      <div className="stripe-container">
        <div>
          <ProductCard item={item}> </ProductCard>
        </div>

        <div className="stripe-payment-form">
          <h2 className="stripe-span">
            Complete Your Payment With Stipe Payment Method
          </h2>

          <Elements stripe={stripeTestPromise}>
            <PaymentForm item={item} userId={location.state.userId} />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default StripeContainer;
