import {PRODUCT} from "../constant/actionTypes";

const productInitial  = {
    data: [],
    name: '',
    unit: '',
    description: '',
    importPrice: 0,
    quantity: 0,
    productCode: ''
};

export function listProduct (state = productInitial, action = {}) {
    switch (action.type) {
        case PRODUCT.FETCH_LIST_PRODUCT: {
            return {
                ...state,
                data: action.payload
            }
        }
        case PRODUCT.UPDATE_PRODUCT: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}