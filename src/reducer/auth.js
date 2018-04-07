import {AUTH_ACTION} from "../constant/actionTypes";

const initialState = {
    user: {}
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_ACTION.CURRENT_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        default: return state;
    }
}