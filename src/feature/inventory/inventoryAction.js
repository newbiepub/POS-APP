import {INVENTORY} from "../../constant/constant";
import {client} from '../../root';
import {QUERY} from "../../constant/query";
import {MUTATION} from "../../constant/mutation";
import {omitDeep} from "../../reuseable/function/function";

function fetchInventoryActivityEmployeeAmountAction(payload) {
    return {
        type: INVENTORY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE_AMOUNT,
        payload
    }
}

function fetchInventoryActivityEmployeeAction(payload) {
    return {
        type: INVENTORY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE,
        payload
    }
}
function selectInventoryActivityAction(payload) {
    return {
        type: INVENTORY.SELECT_INVENTORY_ACTIVITY,
        payload
    }
}
export function fetchInventoryActivityEmployeeAmount() {
    return async (dispatch, getState) => {
        try {
            const inventoryActivityAmount = await client.query({
                query: QUERY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE_AMOUNT,
                fetchPolicy: "network-only"
            });
            dispatch(fetchInventoryActivityEmployeeAmountAction(inventoryActivityAmount.data.FETCH_INVENTORY_ACTIVITY_EMPLOYEE_AMOUNT))
        } catch (e) {
            console.warn("inventoryAction.js-fetchInventoryActivityEmployeeAmount-" + e)
        }

    }
}
export function selectInventoryActivity(item) {
    return async (dispatch, getState) => {
        try {
            dispatch(selectInventoryActivityAction(item))
        } catch (e) {
            console.warn("inventoryAction.js-fetchInventoryActivityEmployeeAmount-" + e)
        }

    }
}
export function fetchInventoryActivityEmployee(limit, skip) {
    return async (dispatch, getState) => {
        try {
            const inventoryActivity = await client.query({
                query: QUERY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE,
                variables: {
                    limit: limit,
                    skip: skip
                },
                fetchPolicy: "network-only"
            });
            dispatch(fetchInventoryActivityEmployeeAction(omitDeep(inventoryActivity.data.FETCH_INVENTORY_ACTIVITY_EMPLOYEE, '__typename')))
        } catch (e) {
            console.warn("inventoryAction.js-fetchInventoryActivityEmployee-" + e)
        }

    }
}