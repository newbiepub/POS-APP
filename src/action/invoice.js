import config from "../config";
import {ASYNC_STORAGE, INVOICE} from "../constant/constant";
import store from "../store/configureStore";

function getInvoiceAction(payload) {
    return {
        type: INVOICE.GET_INVOICE,
        payload
    }
}

export async function getInvoice() {
    try {
        let token = await require("react-native").AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/invoice/byDate?access_token=${token.access_token}`);
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }

        return (!store.getState().invoice.data.length && !response.length) ? store.dispatch(getInvoiceAction("No Data")) : store.dispatch(getInvoiceAction(response));
    } catch (e) {
        throw e;
    }
}

export async function deleteInvoice (item) {
    try {
        let token = await require("react-native").AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/api/invoice/remove`, {
            method: "POST",
            headers: {
                'access-token': token.access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({invoiceId: item.invoiceId})
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