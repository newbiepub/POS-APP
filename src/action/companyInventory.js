import {ASYNC_STORAGE, INVENTORY} from "../constant/constant";
import config from "../config";
import store from "../store/configureStore";
import { AsyncStorage } from "react-native";

function getInventoryProductAction(payload) {
    return {
        type: INVENTORY.GET_INVENTORY_PRODUCT,
        payload
    }
}

export async function getInventoryProduct(searchText) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let url = `${config.api}/company/api/inventory/product?access_token=${token.access_token}`;
        if (searchText && searchText.length) {
            url += "&searchText=" + searchText;
        }

        let response = await fetch(url);
        response = await response.json();
        return !store.getState().inventory.product.length && !response.length
            ? store.dispatch(getInventoryProductAction("No Data"))
            : store.dispatch(getInventoryProductAction(response))
    } catch (e) {
        alert("Đã có lỗi xảy ra khi tải dữ liệu");
        store.dispatch(getInventoryProductAction("No Data"))
    }
}

function getInventoryIngredientAction(payload) {
    return {
        type: INVENTORY.GET_INVENTORY_INGREDIENT,
        payload
    }
}

function updateInventoryAfterChargeAction(payload) {
    return {
        type: INVENTORY.UPDATE_INVENTORY_AFTER_CHARGE,
        payload
    }
}

export async function getInventoryIngredient(searchText) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let url = `${config.api}/company/api/inventory/ingredient?access_token=${token.access_token}`;
        if (searchText && searchText.length) {
            url += "&searchText=" + searchText;
        }

        let response = await fetch(url);
        response = await response.json();
        return !store.getState().inventory.ingredient.length && !response.length
            ? store.dispatch(getInventoryIngredientAction("No Data"))
            : store.dispatch(getInventoryIngredientAction(response))
    } catch (e) {
        alert("Đã có lỗi xảy ra khi tải dữ liệu");
        store.dispatch(getInventoryIngredientAction("No Data"))
    }
}

export async function createIngredient(ingredient) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventory/ingredient?access_token=${token.access_token}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        });
        response = await response.json();
        if (response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}

export async function updateIngredient(ingredient) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventory/ingredient/${ingredient._id}?access_token=${token.access_token}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        });
        response = await response.json();
        if (response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}

export async function deleteIngredient(ingredient) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventory/ingredient/${ingredient._id}?access_token=${token.access_token}`, {
            method: "DELETE",
        });
        response = await response.json();
        if (response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}