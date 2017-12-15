import {INVENTORY} from "../constant/constant";
import config from "../config";
import store from "../store/configureStore";

function getInventoryProductAction (payload) {
    return {
        type: INVENTORY.GET_INVENTORY_PRODUCT,
        payload
    }
}

export async function getInventoryProduct(access_token) {
    try {
        let response = await fetch(`${config.api}/api/inventory/product?access_token=${access_token}`);
        response = await response.json();
        return !store.getState().inventory.product.length && !response
            ? store.dispatch(getInventoryProductAction("No Data"))
            : store.dispatch(getInventoryProductAction(response))
    } catch(e) {
        alert("Đã có lỗi xảy ra khi tải dữ liệu");
        store.dispatch(getInventoryProductAction("No Data"))
    }
}

function getInventoryIngredientAction (payload) {
    return {
        type: INVENTORY.GET_INVENTORY_INGREDIENT,
        payload
    }
}

export async function getInventoryIngredient(access_token) {
    try {
        let response = await fetch(`${config.api}/api/inventory/ingredient?access_token=${access_token}`);
        response = await response.json();
        return !store.getState().inventory.product.length && !response
            ? store.dispatch(getInventoryIngredientAction("No Data"))
            : store.dispatch(getInventoryIngredientAction(response))
    } catch(e) {
        alert("Đã có lỗi xảy ra khi tải dữ liệu");
        store.dispatch(getInventoryIngredientAction("No Data"))
    }
}