import {PRODUCT, USER} from '../../constant/constant';
import {REHYDRATE} from 'redux-persist';
import _ from 'lodash'

const initialState = {
    paymentMethod: [],
    paymentStatus: [],
    productAmount: 0,
    product: [],
    category: [],
    isCategoryViewOpen:true,
};

function updateProduct(state, product) {
    if (state.length === 0) {
        return product
    } else {
        for (let i = 0; i < product.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (product[i].product._id === state[j].product._id) {
                    state.splice(j, 1);
                    state.splice(j, 0, product[i]);
                    break;
                } else {
                    if (j === state.length - 1) {
                        state.push(product[i])
                    }
                }
            }

        }
    }
    return state

}

function subtractInventoryLocal(state, product) {
    if (state.length === 0) {
        return product
    } else {
        for (let i = 0; i < product.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (product[i].productId === state[j].product._id) {
                    let newProduct = Object.assign({}, state[j]);
                    newProduct.quantity = state[j].quantity - product[i].quantity;

                    state.splice(j, 1);
                    state.splice(j, 0, newProduct);
                    break;
                }
            }

        }
    }
    return state

}

export default function async(state = initialState, action = {}) {
    switch (action.type) {
        case PRODUCT.GET_PRODUCT: {
            let newProduct = updateProduct(state.product, action.payload);
            // console.warn(newProduct.length);
            return {
                ...state,
                product: [...newProduct]
            }
        }
        case PRODUCT.SUBTRACT_PRODUCT_INVENTORY: {
            let newProduct = subtractInventoryLocal(state.product, action.payload);
            // console.warn(newProduct.length);
            return {
                ...state,
                product: [...newProduct]
            }
        }
        case PRODUCT.GET_PRODUCT_AMOUNT : {
            return {
                ...state,
                productAmount: action.payload
            }

        }
        case PRODUCT.GET_PAYMENT_STATUS: {
            return {
                ...state,
                paymentStatus: action.payload
            }
        }
        case PRODUCT.GET_PAYMENT_METHOD: {
            return {
                ...state,
                paymentMethod: action.payload
            }
        }
        case PRODUCT.SWITCH_CATEGORY_VIEW:{
            return {
                ...state,
                isCategoryViewOpen: !state.isCategoryViewOpen
            }
        }
        case REHYDRATE: {
            if (action.payload && action.payload.productReducer) {
                return {
                    ...state,
                    product: action.payload.productReducer.product,
                    productAmount: action.payload.productReducer.productAmount,
                    paymentStatus: action.payload.productReducer.paymentStatus,
                    paymentMethod: action.payload.productReducer.paymentMethod,
                    category: action.payload.productReducer.category,
                    isCategoryViewOpen: action.payload.productReducer.isCategoryViewOpen
                };

            } else {
                return {
                    ...state
                }
            }

        }
        case USER.LOG_OUT: {
            return {
                paymentMethod: [],
                paymentStatus: [],
                productAmount: 0,
                product: [],
                category: [],
                isCategoryViewOpen:false,
            };
        }
        default:
            return {
                ...state
            };
    }
}