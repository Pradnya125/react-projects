import { useContext } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem =(props)=>{

  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  
  const addToCartHandler= (qty)=>{
    console.log("inside addToCartHandler - MealItem", qty)
        ctx.addItem({
           id: props.id,
           name: props.title,
           amount:qty,
           price:props.price
        });
  }

  return(
    <li className={classes.Meal}>
        <div>
           <h3>{props.title}</h3>
           <div className={classes.description}>{props.description}</div>
           <div className={classes.price}>{price}</div>
        </div>
        <div>
           <MealItemForm id={props.id} addToCart={addToCartHandler}/>
        </div>
    </li>
  );
}
export default MealItem;