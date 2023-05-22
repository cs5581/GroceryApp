import React from "react";
import mealsImage from "../../Assets/tablefood3.jpg";
import classes from "./Header.module.css";
import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Good Eats</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Food Gallery" />
      </div>
    </Fragment>
  );
};

export default Header;
