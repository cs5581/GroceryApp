import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import createContextNow from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import { Routes, Route, useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const cartCTX = useContext(createContextNow);
  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
  const hasItems = cartCTX.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 });
  };
  const redirectionPlaceOrderHandler = () => {
    navigate("../Pages/PlaceOrderScreen/");
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

  return (
    <Modal onDisengage={props.onDisengage}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onDisengage}>
          Close
        </button>
        {hasItems && (
          <button
            className={classes.button}
            onClick={redirectionPlaceOrderHandler}
          >
            Order
          </button>
        )}
        <Routes>
          <Route
            path="../Pages/PlaceOrderScreen/"
            element={<PlaceOrderScreen />}
          ></Route>
        </Routes>
      </div>
    </Modal>
  );
};

export default Cart;
