import {useRef, useState} from 'react';

import classes from './Checkout.module.css'

const Checkout=(props)=>{
 
  const [formValidity, setFormValidity]=useState({
    name:true,
    street:true,
    postalCode:true,
    city:true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef= useRef();

  const confirmOrderHandler = (event)=>{
    event.preventDefault();

    const isEmpty= (value)=>{
        return value.trim() !== '';
    }

    const isFiveChars =(value)=>{
        return value.length === 5;
    }

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    
    const enteredNameIsValid = isEmpty(enteredName);
    const enteredStreetIsValid = isEmpty(enteredStreet);   
    const enteredCityIsValid = isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormValidity({
       name:enteredNameIsValid,
       street:enteredStreetIsValid,
       postalCode:enteredPostalCodeIsValid,
       city:enteredCityIsValid   
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalCode:enteredPostalCode,
        city:enteredCity
    });

  }


  return(
    <form className={classes.form} onSubmit={confirmOrderHandler}>
        <div className={`${classes.control} ${formValidity.name ? '': classes.invalid}` }>
            <label htmlFor='name'>Name</label>
            <input type="text" id='name'  ref={nameInputRef}/>
            {!formValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={`${classes.control} ${formValidity.street ? '': classes.invalid}` }>
            <label htmlFor='street'>Street</label>
            <input type="text" id='street' ref={streetInputRef} />
            {!formValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={`${classes.control} ${formValidity.postalCode ? '': classes.invalid}` }>
            <label htmlFor='postalCode'>Postal code</label>
            <input type="text" id='postalCode' ref={postalCodeInputRef} />
            {!formValidity.postalCode && <p>Please enter a valid postal code</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city ? '': classes.invalid}` }>
            <label htmlFor='city'>City</label>
            <input type="text" id='city' ref={cityInputRef} />
            {!formValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.cancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
        
    </form>
  )

}
export default Checkout;