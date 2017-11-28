import {PRODUCT} from "../constant/constant";

const initialState = {
    allProduct: [],
    variantProduct:[],
    allDiscount:
        [{name: 'Cồn', prices: [{type: "Bình thường", value: 100, SKU: 'helo'}]}],
    category: [
        {name: 'lẻ'},
        {name: 'sỉ'}
    ]
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
                    variantProduct:action.payload.variant,
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