import {ACCOUNT_COMPANY, TAX} from "../constant/constant";

const initialState = {
    tax: 0,
    taxHistory:[]
};

export default tax(initialState);

function tax(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case TAX.GET_TAX_HISTORY: {
                return {
                    ...state,
                    taxHistory: action.payload
                }
            }
            case TAX.GET_CURRENT_TAX: {
                return {
                    ...state,
                    tax: action.payload
                }
            }
            default: {
                return state
            }
        }
    }
}