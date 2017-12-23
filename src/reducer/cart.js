import {CART} from "../constant/constant";

const initialState = {
    currentCart: []
};

export default productReducer(initialState);

function addToCart(currentCart, product) {

    for (item of currentCart) {

        if (product.productInfo._id === item.productInfo._id ) {
            let index = currentCart.indexOf(item);
            currentCart.splice(index, 1);
            return currentCart.splice(index, 0, product);
        }
    }

    // for (item of currentCart) {
    //
    //     if (product.price._id === item.price._id) {
    //         return item.quantity = product.quantity, item.totalPrice = product.totalPrice, item.productCharge = product.productCharge, item.discount =
    //             product.discount, item.productInfo = product.productInfo;
    //
    //     }
    // }
    return currentCart.push(product)

}

function removeItemInCart(currentCart, id) {
    for (item of currentCart) {

        if (id === item.productInfo._id) {
            currentCart.splice(currentCart.indexOf(item), 1);
            break;
        }
    }
}

function productReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case CART.ADD_TO_CART: {
                addToCart(state.currentCart, action.payload);
                return {
                    ...state,
                    currentCart: [...state.currentCart]
                }
            }
            case CART.CLEAR_CART: {
                return {
                    ...state,
                    currentCart: []
                }
            }
            case CART.REMOVE_CART: {
                removeItemInCart(state.currentCart, action.payload);
                return {
                    ...state,
                    currentCart: [...state.currentCart]
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}