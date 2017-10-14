import {ACCOUNT, ASYNC_STORAGE} from "../constant/constant";
import { AsyncStorage } from "react-native";

const initialState = {
    loginState: false,
    user: {}
};

function accountReducer(initialState) {
    if(initialState) {
        return function accountReducerFn(state = initialState, action = {}) {
            switch (action.type) {
                case ACCOUNT.LOGIN: {
                    let { access_token, refresh_token } = action.payload;
                    let loginState = false;
                    if(access_token && refresh_token) {
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
                default:
                    return {
                        ...state
                    }
            }
        }
    }
}

export default accountReducer(initialState);