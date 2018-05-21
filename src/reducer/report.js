import {TRANSACTION} from "../constant/actionTypes";

const initialState = {};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case TRANSACTION.GET_EMPLOYEE_TRANSACTION: {
            return {
                [action.payload.userId]: action.payload.data
            }
        }
        default: return state;
    }
}