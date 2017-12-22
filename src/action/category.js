import config from "../config";
import {ASYNC_STORAGE} from "../constant/constant";
import {AsyncStorage} from "react-native";

export async function createCategory(payload) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/category/create?access_token=${token.access_token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        console.warn("error - createCategory");
        throw e;
    }
}

export async function updateCategory(categoryId, payload) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);

        let response = await fetch(`${config.api}/api/category/update?access_token=${token.access_token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({categoryId, ...payload})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch(e) {
        console.warn("error - updateCategory");
        throw e;
    }
}

export async function removeCategory (categoryId) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);

        let response = await fetch(`${config.api}/api/category/remove?access_token=${token.access_token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({categoryId})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        console.warn("error - removeCategory");
    }
}