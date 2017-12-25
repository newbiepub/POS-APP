import {ACCOUNT, INVENTORY} from "../constant/constant";

const initialState = {
    product: [],
    ingredient: []
};

function updateProductAfterCharge(state, productItems) {
    for (item of state) {
        for (product of productItems) {
            if (item._id === product._id) {
                item.quantity = item.quantity - product.quantity
            }
        }

    }
}

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
        case INVENTORY.UPDATE_INVENTORY_AFTER_CHARGE: {
            updateProductAfterCharge(state.product, action.payload)
            return {
                ...state,
                product: [...state.product]
            }
        }
        case ACCOUNT.LOGOUT:
            return initialState;
        default:
            return {...state}
    }
}