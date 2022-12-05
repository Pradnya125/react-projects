import { useReducer } from "react";
import CartContext from "./cart-context";

//We used CartProvider to manage CartContext and provide CartContext detail
//to other components which accessing cart details

const defaultCartState={
    item: [],
    totalAmount:0
}

//state - prev stored state
const cartReducer= (state, action)=>{
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        
        //check if the newly added food item already exist in cart or not
        //extistingCartItemIndex will have item index in array
       const existingCartItemIndex = state.item.findIndex(
          (item)=> item.id === action.item.id
       );

       //existingCartItem contain item value which is already exist in item array
       const existingCartItem= state.item[existingCartItemIndex];
    
       let updatedItems;

       //if item is already exist in array
       if(existingCartItem){
         const updatedItem ={
            ...existingCartItem,
            amount:existingCartItem.amount + action.item.amount
          };
           updatedItems = [...state.item];
           //update the prev added item with new quantity
           updatedItems[existingCartItemIndex]= updatedItem;
       }else{
         //for new item         
           updatedItems = state.item.concat(action.item);            
       }
         return{
                item: updatedItems,
                totalAmount: updatedTotalAmount
        };
    }

    if(action.type === "REMOVE"){
        const existingCartItemIndex = state.item.findIndex(
            (item)=> item.id === action.id
         );
         console.log("remove item", existingCartItemIndex)
         
         const existingCartItem= state.item[existingCartItemIndex];

         const updatedTotalAmount = state.totalAmount - existingCartItem.price;

         let updatedItems;
         if(existingCartItem.amount === 1){
            //here we will check if the selected item is the only single item in the Cart => quantity =1
            updatedItems= state.item.filter((item)=> item.id !== action.id)
         }else{
             const updatedItem = {...existingCartItem, amount: existingCartItem.amount- 1};
             updatedItems = [...state.item];
             updatedItems[existingCartItemIndex] = updatedItem;
         }

         return{
            item: updatedItems,
           totalAmount: updatedTotalAmount
        };
      
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

   return defaultCartState;
}

const CartProvider= (props)=>{

    const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type:"ADD", item: item});
    }

    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type:"REMOVE", id: id});
    }

    const clearItemHandler=()=>{
        dispatchCartAction({type:'CLEAR'})
    }

    const cartContext={
         item:cartState.item,
         totalAmount:cartState.totalAmount,
         addItem: addItemToCartHandler,
         removeItem: removeItemFromCartHandler,
         clearCart: clearItemHandler
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}
export default CartProvider;