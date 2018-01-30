import {CART_ACTION} from "../../constant/constant";

function addToCartAction(payload) {
    return {
        type: CART_ACTION.ADD_TO_CART,
        payload
    }
}

function clearCartAction() {
    return {
        type: CART_ACTION.CLEAN_CART,
    }
}

export function addToCart(product) {
    return async (dispatch, getState) => {
        try {
            dispatch(addToCartAction(product))

        } catch (e) {
            console.warn(e);
        }
    }
}

export function clearCart() {
    return async (dispatch, getState) => {
        try {
            dispatch(clearCartAction())

        } catch (e) {
            console.warn(e);
        }
    }
}