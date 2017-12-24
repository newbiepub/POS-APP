import {ACCOUNT_COMPANY, ASYNC_STORAGE} from "../constant/constant";
import config from "../config";
import store from "../store/configureStore";
import { AsyncStorage } from "react-native";

function companyLoginAction (payload) {
    return {
        type: ACCOUNT_COMPANY.COMPANY_LOGIN,
        payload
    }
}

function getCurrentCompanyAction(payload) {
    return {
        type: ACCOUNT_COMPANY.GET_CURRENT_COMPANY,
        payload
    }
}

export async function companyLogin(email, password) {
    try {
        let response = await fetch(`${config.api}/company/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        await AsyncStorage.setItem(ASYNC_STORAGE.COMPANY_AUTH, JSON.stringify({
            access_token: response.access_token,
            refresh_token: response.refresh_token
        }));
        store.dispatch(companyLoginAction(response));
    } catch(e) {
        throw e;
    }
}

export async function companyAuth () {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        if(token) {
            token = JSON.parse(token);
            let response = await fetch(`${config.api}/company/auth`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token})
            });
            response = await response.json();
            if(response.error) {
                throw new Error(response.error.message);
            }
            await AsyncStorage.setItem(ASYNC_STORAGE.COMPANY_AUTH, JSON.stringify({
                access_token: response.access_token,
                refresh_token: response.refresh_token
            }));
            store.dispatch(companyLoginAction(response));
        }
    } catch(e) {
        throw e;
    }
}

export async function getCurrentCompany () {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/account/currentCompany?access_token=${token.access_token}`);
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return store.dispatch(getCurrentCompanyAction(response));
    } catch(e) {
        throw e;
    }
}

function logoutAction() {
    return {
        type: ACCOUNT_COMPANY.LOGOUT
    }
}

export async function logout() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        if (token) {
            let {access_token} = JSON.parse(token),
                response = await fetch(`${config.api}/company/api/account/logout`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({access_token})
                });
            // Remove Token From Local Storage
            await AsyncStorage.removeItem(ASYNC_STORAGE.COMPANY_AUTH);
            return store.dispatch(logoutAction());
        } else {
            throw new Error("Đăng Xuất Lỗi");
        }
    } catch (e) {
        throw e;
    }
}