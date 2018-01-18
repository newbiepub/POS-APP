import {AsyncStorage} from "react-native";

const AUTH_TOKEN = "AUTH_TOKEN";
let token = null;

export const getToken = async () => {
    try {
        if (token) {
            return Promise.resolve(token);
        }

        token = await AsyncStorage.getItem(AUTH_TOKEN);
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
        token = null;
    }
    catch (e) {
        console.warn("error - removeToken")
    }
};