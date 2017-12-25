import {ACCOUNT, INVOICE} from "../constant/constant";

const initialState = {
    data: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVOICE.GET_INVOICE: {
            return {
                ...state,
                data: action.payload
            }
        }
        case ACCOUNT.LOGOUT:
            return initialState;
        default: return {...state}
    }
}