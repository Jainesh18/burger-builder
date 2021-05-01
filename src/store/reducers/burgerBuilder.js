import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    error:false,
    loading:true,
    totalPrice:10
}

const INGREDIENT_PRICE = {
    salad: 3,
    meat: 5,
    bacon: 4,
    cheese: 7,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
            };
        case actionTypes.DEL_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice:10,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default:
            return state;
    }
    
}

export default reducer;