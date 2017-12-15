import {INVENTORY} from "../constant/constant";

const initialState = {
    product: [],
    ingredient: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY.GET_INVENTORY_PRODUCT: {
            return {
                ...state,
                product: action.payload || []
            }
        }
        case INVENTORY.GET_INVENTORY_INGREDIENT: {
            return {
                ...state,
                ingredient: action.payload || []
            }
        }
        default: return {...state}
    }
}