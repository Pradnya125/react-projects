import { useContext,useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCart.module.css";


const HeaderCart = (props)=>{

const cartCtx =  useContext(CartContext);
const {item} =cartCtx;

const [btnIsHighlighted, setBtnIsHighlighted]= useState(false);

const numberOfCartItems = cartCtx.item.reduce((accumulator, item)=>{
             console.log("header badge", item);
              return accumulator + item.amount;
            }, 0);

const btnClasses =`${classes.button} ${btnIsHighlighted ?  classes.bump : "" }`;            

useEffect(()=>{
  if(item.length === 0){
     return;
  }
  setBtnIsHighlighted(true);

  const timer= setTimeout(()=>{
    setBtnIsHighlighted(false);
  }, 300);

  return()=>{
    clearTimeout(timer);
  }

},[item]);           

 return (
   <button className={btnClasses} onClick={props.onCartClick}>
      <span className={classes.icon}>
          <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
    <span className={classes.badge}>
       {numberOfCartItems}
    </span>

 </button>);
}
export default HeaderCart;