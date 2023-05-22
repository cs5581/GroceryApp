import React, { Fragment } from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.card}>
      <div>{props.children}</div>
    </div>
  );
};

export default Card;
