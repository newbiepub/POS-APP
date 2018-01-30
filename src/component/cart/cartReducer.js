import {CART_ACTION} from '../../constant/constant';

const initialState = {
    cart: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case CART_ACTION.ADD_TO_CART: {
            return {
                cart: state.cart.concat(action.payload)
            }
        }
        case CART_ACTION.CLEAN_CART: {
            return {
                cart: []
            }
        }

        default:
            return {
                ...state
            };
    }
}