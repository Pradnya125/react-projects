import React, { useContext, useState } from 'react';

import CartItem from './CartItem';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart =(props)=>{

    const [isCheckout, setIsCheckout]=useState(false);
    const [isSubmitting, setIsSubmitting]= useState(false);
    const [requestSubmit, setRequestSubmit]= useState(false);
    
    const cartCtx = useContext(CartContext);

    const addCartItem = (item)=>{
        cartCtx.addItem({...item, amount:1});
    }

    const removeCartItem=(id)=>{
       cartCtx.removeItem(id)
    }

    const onOrderClick=()=>{
       setIsCheckout(true);
    }

    const onPlaceOrder = async (userData)=>{
      setIsSubmitting(true); 
      const response= await fetch('https://food-app-70365-default-rtdb.firebaseio.com/foodOrders.json',{
         method:'POST',
         body:JSON.stringify({
            user:userData,
            foodItems: cartCtx.item
         })
      });

     if(response.ok){
       setIsSubmitting(false);
       setRequestSubmit(true);
       cartCtx.clearCart();
     }
      
    }

    const cartItems = (<ul className={classes["cart-items"]}>
                     { cartCtx.item.map((item)=> 
                       <CartItem key={item.id}
                                 name={item.name} 
                                 price={item.price}
                                 amount={item.amount} 
                                 onAdd={addCartItem.bind(null,item)}
                                 onRemove ={removeCartItem.bind(null,item.id)}  />)
                   }</ul>);

             

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.item.length > 0;
    

    const modalActions = <div className={classes.actions}>
                          <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                          { hasItems && <button className={classes.button} onClick={onOrderClick}>Order</button>} 
                      </div>; 

    const cartModalContent = <React.Fragment>
          {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
           {isCheckout && <Checkout onConfirm={ onPlaceOrder} cancel={props.onCloseCart}/> } 
           {!isCheckout && modalActions }
    </React.Fragment>  
    
    const isSubmittingContent = <React.Fragment><p>Wait, your order is preparing</p></React.Fragment>

    const requestPlacedContent=<React.Fragment>
         <p>Your Order placed suuccessfully</p>
         <div className={classes.actions}>
             <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
         </div>    
    </React.Fragment>

    return(
        <Modal closeCart={props.onCloseCart}>
            {!isSubmitting && !requestSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}     
            { !isSubmitting && requestSubmit && requestPlacedContent }       
        </Modal>
    )

}

export default Cart;