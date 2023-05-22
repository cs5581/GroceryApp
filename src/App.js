import "./App.css";
import React, { useState } from "react";
import { Fragment } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [showModal, setShowModal] = useState(false);

  const showCartHandler = () => setShowModal(true);
  const hideCartHandler = () => setShowModal(false);

  return (
    <CartProvider>
      {showModal && <Cart onDisengage={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
