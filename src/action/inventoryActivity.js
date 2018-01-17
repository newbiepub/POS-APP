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

export async function sendExportProduct() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);

        let getExportProduct = store.getState().inventoryActivity.exportProduct,
            exportProduct = getExportProduct.map((item, index) => ({productId: item._id, quantity: item.quantity}));

        let response = await fetch(`${config.api}/api/inventoryActivity/pos/import/product`, {
            method: "POST",
            headers: {
                "access-token": token.access_token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({exportProduct})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}

export async function sendExportIngredient() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);

        let getExportIngredient = store.getState().inventoryActivity.exportIngredient,
            exportIngredient = getExportIngredient.map((item, index) => ({ingredientId: item._id, quantity: item.quantity}));

        let response = await fetch(`${config.api}/api/inventoryActivity/pos/import/ingredient`, {
            method: "POST",
            headers: {
                "access-token": token.access_token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({exportIngredient})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}

export async function sendDelivery(employeeId, type) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);

        let response = await fetch(`${config.api}/company/api/inventoryActivity/accept/delivery/${type}`, {
            method: "POST",
            headers: {
                'access-token': token.access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({employeeId})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response
    } catch (e) {
        throw e;
    }
}

function getCompanyInventoryActivityAction (payload) {
    return {
        type: INVENTORY_ACTIVITY.GET_INVENTORY_ACTIVITY_DATA,
        payload
    }
}

export async function getCompanyInventoryActivity() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventoryActivity/getImport`, {
            method: "GET",
            headers: {
                'access-token': token.access_token
            }
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        store.dispatch(getCompanyInventoryActivityAction(response));
    } catch(e) {
        throw e;
    }
}

export async function getInventoryActionProduct(employeeId) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventoryActivity/pos/product?&employeeId=${employeeId}`, {
            method: "GET",
            headers: {
                'access-token': token.access_token
            }
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

export async function getInventoryActionIngredient(employeeId) {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/inventoryActivity/pos/ingredient?&employeeId=${employeeId}`, {
            method: "GET",
            headers: {
                'access-token': token.access_token
            }
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

export async function acceptDelivery() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);

        let response = await fetch(`${config.api}/api/inventoryActivity/pos/accept/delivery`, {
            method: "POST",
            headers: {
                'access-token': token.access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response;
    } catch (e) {
        throw e;
    }
}

export async function checkDelivery() {
    try {
        let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/inventoryActivity/pos/check/delivery`, {
            method: "GET",
            headers: {
                'access-token': token.access_token
            },
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        return response.check;
    } catch(e) {
        throw e;
    }
}