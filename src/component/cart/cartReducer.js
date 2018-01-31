import {CART_ACTION} from '../../constant/constant';

const initialState = {
    cart: []
};

const addToCart = (product, cart) => {
    for (let i = 0; i <= cart.length; i++) {
        if (i === cart.length) {
            cart.push(product);
            break;
        }
        let item = cart[i];
        if (item._id === product._id) {
            cart.splice(i, 1);
            cart.splice(i, 0, product);
            break;
        }

    }

};
const removeFromCart = (id, cart) => {
    for (let i = 0; i < cart.length; i++) {
        if (id === cart[i]._id) {
            cart.splice(i, 1);
            break;
        }
    }
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case CART_ACTION.ADD_TO_CART: {
            addToCart(action.payload, state.cart);
            return {
                cart: [...state.cart]
            }
        }
        case CART_ACTION.REMOVE_FROM_CART: {
            removeFromCart(action.payload, state.cart);
            return {
                cart: [...state.cart]
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