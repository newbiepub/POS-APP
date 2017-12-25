import {ACCOUNT, ASYNC_STORAGE} from "../constant/constant";
import {AsyncStorage} from "react-native";

const initialState = {
    loginState: false,
    user: {},
    access_token: "",
    refresh_token: ""
};

function accountReducer(initialState) {
    if (initialState) {
        return function accountReducerFn(state = initialState, action = {}) {
            switch (action.type) {
                case ACCOUNT.LOGIN: {
                    let {access_token, refresh_token} = action.payload;
                    let loginState = false;
                    if (access_token && refresh_token) {
                        loginState = true;
                    }
                    // Save Auth Token to Async Storage
                    AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, JSON.stringify({access_token, refresh_token}));
                    return {
                        ...state,
                        loginState,
                        access_token,
                        refresh_token
                    }
                }
                case ACCOUNT.GET_CURRENT_USER: {
                    return {
                        ...state,
                        user: action.payload
                    }
                }
                case ACCOUNT.LOGOUT: {
                    return initialState;
                }
                default:
                    return state
            }
        }
    }
}

export default accountReducer(initialState);