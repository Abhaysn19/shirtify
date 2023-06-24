import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "./cartHelper";
import { isAuthenticated } from "../../auth/helper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./orderHelper";

const StripeCheckout = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    if (products && products.length > 0) {
      products.forEach((p) => {
        amount += p.price;
      });
    }
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        cartEmpty();
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51NMQgZSA5Fmldx1GvhkNBzaOjUS8wIlG3bMFdUCPElfkSB2329qGUg56BSmpIrlJnc15YP0ARRLsuATCpSnYKhQd00ysrb5tNA" // Replace with your actual Stripe publishable key
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;

















































