import {PRODUCT} from "../constant/constant";

const initialState = {
    loading: true,
    allProduct: [],
    variantProduct: [],
    allDiscount:
        [{name: 'Cồn', prices: [{type: "Bình thường", value: 100, SKU: 'helo'}]}],
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
                    allProduct: action.payload.product,
                    variantProduct: action.payload.variant,
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
            default: {
                return {
                    ...state
                }
            }
        }
    }
}