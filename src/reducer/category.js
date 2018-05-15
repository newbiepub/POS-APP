import {CATEGORY_ACTION} from "../constant/actionTypes";

const productInitial  = {
    name: '',
    description: '',
    products: []
};

export default function (state = productInitial, action = {}) {
    switch (action.type) {
        case CATEGORY_ACTION.UPDATE_CATEGORY: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}