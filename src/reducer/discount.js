import {DISCOUNT_ACTION} from "../constant/actionTypes";

const initialState = {
    data: [],
    amount: 0,
    type: {
        name: 'Theo % giá',
        value: 'percent'
    },
    name: '',
    description: '',
    appliedDate: null,
    dueDate: null,
    employeeIds: [],
    products: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case DISCOUNT_ACTION.FETCH_ALL_DISCOUNT: {
            return {
                ...state,
                data: [...state.data, ...action.payload]
            }
        }
        case DISCOUNT_ACTION.CHANGE_AMOUNT:
        case DISCOUNT_ACTION.APPLY_DATE:
        case DISCOUNT_ACTION.CHANGE_OPTION:
        case DISCOUNT_ACTION.DUE_DATE:
        case DISCOUNT_ACTION.PICK_POS:
        case DISCOUNT_ACTION.PICK_PRODUCTS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state
    }
}