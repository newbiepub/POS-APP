import {AsyncStorage} from "react-native";
import emitter from "../../../event/emitter";
import {EVENT_TYPE} from "../../../constant/eventType";

const AUTH_TOKEN = "AUTH_TOKEN";
let token = null;

export const getToken = async () => {
    try {
        if (token) {
            return token // Return Token
        }

        token = await AsyncStorage.getItem(AUTH_TOKEN); // Get Token From LocalStorage

        if(token) {
            token = JSON.parse(token); // Parse JSON
        }

        return token
    }
    catch (e) {
        console.warn("error - getToken")
    }
};

export const setToken = async (newToken) => {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(newToken));
        token = newToken;
    }
    catch (e) {
        console.warn("error - setToken")
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN);
        token = null; // Remove Token
        emitter.emit(EVENT_TYPE.USER_LOGOUT); // Notify user logout
    }
    catch (e) {
        console.warn("error - removeToken")
    }
};