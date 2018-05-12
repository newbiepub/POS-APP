import {DISCOUNT_ACTION} from "../constant/actionTypes";

const initialState = {
    data: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case DISCOUNT_ACTION.FETCH_ALL_DISCOUNT: {
            return {
                ...state,
                data: [...action.payload]
            }
        }
        default: return state
    }
}