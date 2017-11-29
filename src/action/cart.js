import {CART} from '../constant/constant';


function addToCartAction(payload) {
    return {
        type: CART.ADD_TO_CART,
        payload
    }
}

export function addToCart(item) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                dispatch(addToCartAction(item));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}