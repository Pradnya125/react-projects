import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Butter chicken',
      description: 'chicken with gravy loaded with butter',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Chicken Tandoor',
      description: 'Barbecue Chicken',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Noodles',
      description: 'Veg/Non-veg',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Pasta',
      description: 'Veg/Non-veg',
      price: 18.99,
    },
  ];

 
const AvailableMeals = () =>{

  const [meals, setMeals]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [httpError, setHttpError]= useState(null);


  const fetchMealData = async ()=>{
     setIsLoading(true);
    const response = await fetch('https://food-app-70365-default-rtdb.firebaseio.com/meals.json');
     
    if(!response.ok){
      throw new Error('Something went wrong...');
    }

    const responseData = await response.json(); 
    const menu = responseData.meals; 
    const mealData=[];

    for(const key in menu ){
        mealData.push({
           id:key,
           name: menu[key].name,
           description:menu[key].description,
           price:menu[key].price
        });
    }
   setMeals(mealData);
   setIsLoading(false);
  }

  useEffect(()=>{
    
      fetchMealData().catch((err)=>{
      setIsLoading(false);
      setHttpError(err.message);
    })
    
  },[]);

  if(isLoading){
    return (<section className={classes.mealLoader}>
          <p>Loading...</p>
      </section>)
  }

  if(httpError){
     return (<section className={classes.errorLoader}>
             <p>{httpError}</p>
         </section>)

  }

    const mealList = meals.map((meal) => <MealItem 
                                                key={meal.id} 
                                                id= {meal.id}
                                                title={meal.name} 
                                                description={meal.description}
                                                price= {meal.price}/>)

    return (
      <section className={classes.meals}>
        <Card>
          <ul>
            {mealList}
          </ul>
        </Card>  
      </section>
    );
}

export default AvailableMeals;