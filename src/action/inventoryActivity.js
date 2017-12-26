import {ASYNC_STORAGE, INVENTORY_ACTIVITY} from "../constant/constant";
import config from "../config";
import {AsyncStorage} from "react-native";
import store from "../store/configureStore";

function getExportProductAction (payload) {
    return {
        type: INVENTORY_ACTIVITY.GET_EXPORT_PRODUCT,
        payload
    }
}

export async function getExportProduct() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/inventory/company/product`, {
            method: "GET",
            headers: {
                "access-token": token.access_token
            }
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        store.dispatch(getExportProductAction(response));
    } catch(e) {
        throw e;
    }
}

function getExportIngredientAction (payload) {
    return {
        type: INVENTORY_ACTIVITY.GET_EXPORT_INGREDIENT,
        payload
    }
}

export async function getExportIngredient() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/inventory/company/ingredient`, {
            method: "GET",
            headers: {
                "access-token": token.access_token
            }
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        store.dispatch(getExportIngredientAction(response));
    } catch(e) {
        throw e;
    }
}