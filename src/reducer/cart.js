import {CART} from "../constant/constant";

const initialState = {
    currentCart:[]
};

export default productReducer(initialState);

function productReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case CART.ADD_TO_CART: {
                return {
                    ...state,
                    currentCart:  [...state.currentCart, action.payload]
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