import { useRef , useState} from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props)=>{

    const qtyInputRef = useRef();
    const [qtyIsValid, setQtyIsValid]= useState(true);
   
    const submitHandler = (event)=>{
        event.preventDefault();
       

        const enteredQty = qtyInputRef.current.value;
        const enteredQtyNumber = +enteredQty; //as the type of enteredQty is string, we need to convert it to number

        //validation to check entered quantity
        if(enteredQty.trim().length === 0 || enteredQtyNumber < 1 || enteredQtyNumber > 5){
            setQtyIsValid(false);
            return;
        }

        props.addToCart(enteredQtyNumber);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Quantity"
                  ref= {qtyInputRef} 
                  input={{
                    id : "amount_"+props.id,
                    type: "number",
                    min:'1',
                    max: '5',
                    step:'1',
                    defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!qtyIsValid && <p>Please enter valid quantity</p>}
        </form>
    );
}

export default MealItemForm
