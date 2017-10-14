import {ACCOUNT, ASYNC_STORAGE} from "../constant/constant";
import config from "../config";
import {AsyncStorage} from "react-native";
import store from "../store/configureStore";

function loginAction(payload) {
    return {
        type: ACCOUNT.LOGIN,
        payload
    }
}

function authAction(payload) {
    return {
        type: ACCOUNT.AUTH,
        payload
    }
}

export function login(username, password, errorCallback) {
    return async (dispatch, getState) => {
        try {
            let response = await fetch(`${config.api}/login/app`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            response = await response.json();
            if(response.error) {
                return errorCallback(response.error)
            }
            return dispatch(loginAction(response));
        } catch(e) {
            errorCallback(e);
        }
    }
}

export async function auth() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        if(token != undefined) {
            let { access_token, refresh_token } = JSON.parse(token);
            let response = await fetch(`${config.api}/login/auth`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({access_token, refresh_token})
            });
            response = await response.json();
            if(response.error) {
                throw new Error(response.error.message);
            }
            return store.dispatch(loginAction(response));
        } else {
            throw new Error();
        }
    } catch(e) {
        throw new Error("Xác thực thất bại");
    }
}