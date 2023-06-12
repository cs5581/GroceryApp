import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const hasFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    firstName: true,
    lastName: true,
    address: true,
    city: true,
    postalCode: true,
  });

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

    const enteredFirstNameValid = !isEmpty(enteredFirstName);
    const enteredLastNameValid = !isEmpty(enteredLastName);
    const enteredAddressValid = !isEmpty(enteredAddress);
    const enteredCityValid = !isEmpty(enteredCity);
    const enteredPostalCodeValid = hasFiveChars(enteredPostalCode);

    const formIsValid =
      enteredFirstNameValid &&
      enteredLastNameValid &&
      enteredAddressValid &&
      enteredPostalCodeValid &&
      enteredCityValid;

    setFormValidity({
      firstName: enteredFirstNameValid,
      lastName: enteredLastNameValid,
      address: enteredAddressValid,
      city: enteredCityValid,
      postalCode: enteredPostalCodeValid,
    });

    props.onSubmitOrder({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const firstNameControl = ` ${classes.control} ${
    formValidity.firstName ? "" : classes.invalid
  }`;

  const lastNameControl = ` ${classes.control} ${
    formValidity.lastName ? "" : classes.invalid
  }`;

  const addressControl = ` ${classes.control} ${
    formValidity.address ? "" : classes.invalid
  }`;

  const cityControl = ` ${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  const postCodeControl = ` ${classes.control} ${
    formValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={firstNameControl}>
        <label htmlFor="name">First Name</label>
        <input type="text" id="name" ref={firstNameRef}></input>
        {!formValidity.firstName && <p>First Name field is invalid</p>}
      </div>

      <div className={lastNameControl}>
        <label htmlFor="Lname">Last Name</label>
        <input type="text" id="Lname" ref={lastNameRef}></input>
        {!formValidity.lastName && <p>Last Name field is invalid</p>}
      </div>
      <div className={addressControl}>
        <label htmlFor="address">Address</label>
        <input type="text" id="Address" ref={addressRef}></input>
        {!formValidity.address && <p>Address field is invalid</p>}
      </div>
      <div className={cityControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formValidity.city && <p>City field is invalid</p>}
      </div>

      <div className={postCodeControl}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" ref={postalCodeRef}></input>
        {!formValidity.postalCode && <p>Postal Code field is invalid</p>}
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
