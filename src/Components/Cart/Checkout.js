import classes from "./Checkout.module.css";
import { useRef } from "react";

const Checkout = (props) => {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">First Name</label>
        <input type="text" id="name" ref={firstNameRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="Lname">Last Name</label>
        <input type="text" id="Lname" ref={lastNameRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input type="text" id="Address" ref={addressRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
      </div>

      <div className={classes.control}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" ref={postalCodeRef}></input>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel{" "}
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
