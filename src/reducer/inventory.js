import {INVENTORY_ACTION} from "../constant/actionTypes";

const initialState = {
    products: [],
    history: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY_ACTION.FETCH_USER_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
        case INVENTORY_ACTION.FETCH_INVENTORY_HISTORY: {
            return {
                ...state,
                history: action.payload
            }
        }
        default: return state
    }
}