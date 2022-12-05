import React from "react";

//CartContext - to update Cart details 
const CartContext= React.createContext({
    item:[],
    totalAmount:0,
    addItem : (item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
});

export default CartContext;