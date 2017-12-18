import {INVENTORY} from "../constant/constant";
import config from "../config";
import store from "../store/configureStore";

function getInventoryProductAction (payload) {
    return {
        type: INVENTORY.GET_INVENTORY_PRODUCT,
        payload
    }
}

export async function getInventoryProduct(access_token, searchText) {
    try {
        let url = `${config.api}/api/inventory/product?access_token=${access_token}`;
        if(searchText && searchText.length) {
            url += "&searchText=" + searchText;
        }

        let response = await fetch(url);
        response = await response.json();
        return !store.getState().inventory.product.length && !response.length
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

export async function getInventoryIngredient(access_token, searchText) {
    try {
        let url = `${config.api}/api/inventory/ingredient?access_token=${access_token}`;
        if(searchText && searchText.length) {
            url += "&searchText=" + searchText;
        }

        let response = await fetch(url);
        response = await response.json();
        return !store.getState().inventory.ingredient.length && !response.length
            ? store.dispatch(getInventoryIngredientAction("No Data"))
            : store.dispatch(getInventoryIngredientAction(response))
    } catch(e) {
        alert("Đã có lỗi xảy ra khi tải dữ liệu");
        store.dispatch(getInventoryIngredientAction("No Data"))
    }
}

export async function createIngredient(ingredient, access_token) {
    try {
        let response = await fetch(`${config.api}/api/inventory/ingredient?access_token=${access_token}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch(e) {
        throw e;
    }
}

export async function updateIngredient(ingredient, access_token) {
    try {
        let response = await fetch(`${config.api}/api/inventory/ingredient/${ingredient._id}?access_token=${access_token}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch(e) {
        throw e;
    }
}

export async function deleteIngredient(ingredient, access_token) {
    try {
        let response = await fetch(`${config.api}/api/inventory/ingredient/${ingredient._id}?access_token=${access_token}`, {
            method: "DELETE",
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch(e) {
        throw e;
    }
}