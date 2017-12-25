import {ACCOUNT, PRODUCT} from "../constant/constant";

const initialState = {
    loading: true,
    allProduct: [],
    discount: [],
    category: []
};

export default productReducer(initialState);

function productReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case PRODUCT.CREATE_PRODUCT: {
                return {
                    ...state,
                }
            }
            case PRODUCT.GET_PRODUCT : {
                return {
                    ...state,
                    allProduct: action.payload,
                    loading: false
                }
            }
            case PRODUCT.GET_CATEGORY : {
                return {
                    ...state,
                    category: action.payload,
                    loading: false
                }
            }
            case PRODUCT.GET_DISCOUNT : {
                return {
                    ...state,
                    discount: action.payload
                }
            }
            case ACCOUNT.LOGOUT:
                return initialState;
            default: {
                return {
                    ...state
                }
            }
        }
    }
}