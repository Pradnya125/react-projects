import React, {Fragment} from "react";
import classes from "./Header.module.css";
import MealsImg from "../../assets/meals.jpg";
import HeaderCart from "./HeaderCart";

const Header = (props)=>{
 return <React.Fragment>
     <header className={classes.header}>
        <h1>MealApp</h1>
        <HeaderCart onCartClick={props.onCartClick} />
     </header>
     <div className={classes["main-image"]}>
        <img src={MealsImg} alt="Delecious Food"/>
     </div>
 </React.Fragment>


}

export default Header