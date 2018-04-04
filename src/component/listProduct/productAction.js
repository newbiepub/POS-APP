import {CART_ACTION} from "../../constant/constant";
import {QUERY} from '../../constant/query';

import {client} from '../../root';
function addToCartAction(payload) {
    return {
        type: CART_ACTION.ADD_TO_CART,
        payload
    }
}

export function getProduct(product,limit,skip) {
    return async (dispatch, getState) => {
        try {
            const products = await client.readQuery({
                query
            });


        } catch (e) {
            console.warn(e);
        }
    }
}