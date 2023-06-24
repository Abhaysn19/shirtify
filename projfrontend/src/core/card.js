import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/imageHelper';
import { addItemToCard, addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Redirect } from 'react-router-dom';

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  //function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const cardTitle = product ? product.name : 'A photo from pexels';
  const cardDescription = product ? product.description : 'Default description';
  const cardPrice = product ? product.price : 'Default';

  const addToCartHandler = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addToCartHandler}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
