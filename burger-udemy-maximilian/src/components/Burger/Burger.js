import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    //console.log(transformedIngredients);
    console.log("Burger ingredients" + JSON.stringify(props.ingredients));
    
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey+i} type={ingredientKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    //reduce
    //transform an array, takes in a function as input

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);