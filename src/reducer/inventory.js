import {INVENTORY_ACTION} from "../constant/actionTypes";

const initialState = {
    products: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY_ACTION.FETCH_USER_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
        default: return state
    }
}