import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === ""; // если так, получаем ТРУ
const isFiveChars = value => value.trim().length !== 5;


const Checkout = (props) => {
const [formInputValidity, setFormInputValidity] = useState({
	name: true,
	street: true,
	postal: true,
	city: true
});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	

  const confirmHandler = (event) => {
    event.preventDefault();

	const enteredName = nameInputRef.current.value;
	const enteredStreet = streetInputRef.current.value;
	const enteredPostal = postalInputRef.current.value;
	const enteredCity = cityInputRef.current.value;


	const enteredNameIsValid = !isEmpty(enteredName);
	const enteredStreetIsValid = !isEmpty(enteredStreet);
	const enteredPostalIsValid = !isFiveChars(enteredPostal);
	const enteredCityIsValid = !isEmpty(enteredCity);

	setFormInputValidity({
		name: enteredNameIsValid,
		street: enteredStreetIsValid,
		postal: enteredPostalIsValid,
		city: enteredCityIsValid
	})

	const formIsValid =  enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

	if (!formIsValid) {
		return;
	}

	props.onConfirm({
		name: enteredName,
		street: enteredStreet,
		postal: enteredPostal,
		city: enteredCity
	})
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={nameInputRef} id='name' />
		{!formInputValidity.name && <p>Please, insert name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' ref={streetInputRef} id='street' />
		{!formInputValidity.street && <p>Please, insert street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={postalInputRef} id='postal' />
		{!formInputValidity.postal && <p>Please, insert postal</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' ref={cityInputRef} id='city' />
		{!formInputValidity.city && <p>Please, insert city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;