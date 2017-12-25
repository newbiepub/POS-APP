import {ACCOUNT_COMPANY} from "../constant/constant";

const initialState = {
    isLogin: false,
    company: {},
    access_token: "",
    refresh_token: ""
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case ACCOUNT_COMPANY.COMPANY_LOGIN: {
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                isLogin: action.payload.access_token != undefined
            }
        }
        case ACCOUNT_COMPANY.GET_CURRENT_COMPANY: {
            return {
                ...state,
                company: action.payload
            }
        }
        case ACCOUNT_COMPANY.LOGOUT: {
            return initialState;
        }
        default: return {...state}
    }
}