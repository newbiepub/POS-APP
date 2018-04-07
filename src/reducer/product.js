import {PRODUCT} from "../constant/actionTypes";

const productInitial  = {
    data: []
};

export function listProduct (state = productInitial, action = {}) {
    switch (action.type) {
        case PRODUCT.FETCH_LIST_PRODUCT: {
            return {
                ...state,
                data: action.payload
            }
        }
        default: return state;
    }
}