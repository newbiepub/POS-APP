import {INVENTORY_ACTIVITY} from "../constant/constant";

const initialState = {
    exportProduct: [],
    exportIngredient: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY_ACTIVITY.GET_EXPORT_PRODUCT: {
            return {
                ...state,
                exportProduct: action.payload
            }
        }
        case INVENTORY_ACTIVITY.GET_EXPORT_INGREDIENT: {
            return {
                ...state,
                exportIngredient: action.payload
            }
        }
        default: return {...state}
    }
}