import * as actionsTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

//sync action creator
export const setIngredients = (ingredients) => {
    return {
        type: actionsTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionsTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-2b34f.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
                //this.setState({ingredients: response.data});
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
                //this.setState({error: true})
            });
    }
}