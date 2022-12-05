
import './App.css';
import React, {useState } from 'react';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShown]= useState(false);

  const showCartHandler=()=>{
     setCartIsShown(true);
  }

  const hideCartHandler=()=>{
    setCartIsShown(false);
  }

  return (
   
    //here, we are wrapping all components inside CartProvider as all components require card details
    //Cart - Cart items
    //Header - Badge showing number of items ordered
    //Meal - We have Add functionality in Meal Compoent to add food items in cart

   <CartProvider>
    {cartIsShown && <Cart onCloseCart= {hideCartHandler} /> }
      <Header onCartClick={showCartHandler}/>    
      <main>
            <Meals />
      </main>
   </CartProvider>
     
  );
}

export default App;
