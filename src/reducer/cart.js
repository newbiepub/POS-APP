import {CART} from "../constant/constant";

const initialState = {
    currentCart: []
};

export default productReducer(initialState);

function productReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case CART.ADD_TO_CART: {
                return {
                    ...state,
                    currentCart: [...state.currentCart, action.payload]
                }
            }
            case CART.CLEAR_CART: {
                return {
                    ...state,
                    currentCart:[]
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}