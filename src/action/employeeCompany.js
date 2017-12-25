import config from "../config";
import {ASYNC_STORAGE, EMPLOYEE_COMPANY} from "../constant/constant";
import store from "../store/configureStore";

export async function createEmployee (payload) {
    try {
        let token = await require("react-native").AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);
        let response = await fetch(`${config.api}/company/api/employee`, {
            method: "POST",
            headers: {
                'access-token': token.access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
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

function getEmployeeAction (payload) {
    return {
        type: EMPLOYEE_COMPANY.GET_EMPLOYEE,
        payload
    }
}

export async function getEmployee() {
    try {
        let token = await require("react-native").AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
        token = JSON.parse(token);

        let response = await fetch(`${config.api}/company/api/employee`, {
            method: "GET",
            headers: {
                'access-token': token.access_token,
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        if(response.error) {
            throw new Error(response.error.message);
        }
        store.dispatch(getEmployeeAction(response));
    } catch(e) {
        throw e;
    }
}