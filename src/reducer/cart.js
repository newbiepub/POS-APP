import {CART} from "../constant/constant";

const initialState = {
    currentCart: []
};

export default productReducer(initialState);

function addToCart(currentCart, product) {

    if (product.hasOwnProperty("oldId") && product.oldId !== product._id) {

        for (item of currentCart) {

            if (product.oldId === item.productCharge._id && product.oldId !== product.productCharge._id) {
                currentCart.splice(currentCart.indexOf(item), 1);
                break;
            }
        }
    }
    for (item of currentCart) {

        if (product.productCharge._id === item.productCharge._id) {
            return item.quantity = product.quantity, item.totalPrice = product.totalPrice, item.productCharge = product.productCharge, item.discount =
                product.discount, item.productInfo = product.productInfo;

        }
    }
    return currentCart.push(product)

}

function removeItemInCart(currentCart, id) {
    for (item of currentCart) {

        if (id === item.productCharge._id) {
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