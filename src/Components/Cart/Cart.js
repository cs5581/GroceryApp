import React, { Fragment } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import createContextNow from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import { Routes, Route, useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = (props) => {
  //const navigate = useNavigate();
  const cartCTX = useContext(createContextNow);
  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
  const hasItems = cartCTX.items.length > 0;
  const [isReadyToCheckout, setIsReadyToCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  /* <Routes>
  <Route
    path="../Pages/PlaceOrderScreen/"
    element={<PlaceOrderScreen />}
  ></Route>
</Routes>*/

  const cartItemRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 });
  };

  const onOrderHandler = () => {
    setIsReadyToCheckout(true);
  };

  //const redirectionPlaceOrderHandler = () => {
  //navigate("../Pages/PlaceOrderScreen/");
  //};

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://groceryapp-88b25-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCTX.items,
        }),
      }
    );
    setDidSubmit(true);
    setIsSubmitting(false);
    cartCTX.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCTX.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onDisengage}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalNotSubmitted = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isReadyToCheckout && (
        <Checkout
          onSubmitOrder={submitOrderHandler}
          onCancel={props.onDisengage}
        />
      )}
      {!isReadyToCheckout && modalActions}
    </Fragment>
  );

  const didSubmitUI = (
    <Fragment>
      Sucessfully submited order..
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onDisengage}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const loadingSubmitUI = (
    <Fragment>
      <h1>Submitting order.. Please wait</h1>
    </Fragment>
  );

  return (
    <Modal onDisengage={props.onDisengage}>
      {!isSubmitting && !didSubmit && modalNotSubmitted}
      {didSubmit && didSubmitUI}
      {isSubmitting && !didSubmit && loadingSubmitUI}
    </Modal>
  );
};

export default Cart;
