import {CART_ACTION} from "../../constant/constant";

function addToCartAction(payload) {
    return {
        type: CART_ACTION.ADD_TO_CART,
        payload
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
