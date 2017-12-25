import {ACCOUNT_COMPANY, EMPLOYEE_COMPANY} from "../constant/constant";

const initialState = {
    data: []
};

export default function (state = initialState, action = {}) {
    switch (action.type){
        case EMPLOYEE_COMPANY.GET_EMPLOYEE: {
            return {
                ...state,
                data: action.payload
            }
        }
        case ACCOUNT_COMPANY.LOGOUT: {
            return initialState;
        }
        default: return state
    }
}