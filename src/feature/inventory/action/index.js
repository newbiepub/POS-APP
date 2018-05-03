import {client} from "../../../../App";
import {getProductInventory} from "../productManagement/action/productManagementAction";
import store from "../../../store/store";
import {INVENTORY_ACTION} from "../../../constant/actionTypes";
import {PRODUCT_STORAGE} from "../../../localStorage/index";
import {getInventoryHistory} from "../importExportManagement/action";
import {exportProductToPOS} from "./graph";
import {inventory_history, product_inventory_data} from "../../../api/dataHandler/inventory";

export const INVENTORY = {
    FETCH_USER_PRODUCT: async (userId, type) => {
        try {
            // GET PRODUCT FROM LOCALSTORAGE
            let products = await PRODUCT_STORAGE.GET_PRODUCT(userId);
            store.dispatch({
                type: INVENTORY_ACTION.FETCH_USER_PRODUCT,
                payload: products || []
            })
            // FETCH PRODUCT FROM API
            let { data = {} } = await client.query({
                query: getProductInventory,
                variables: {
                    userId,
                    type
                }
            });
            // User products from inventory
            let { getUserProductInventory = []} = data;
            // Payload data save to store
            let payload = getUserProductInventory.reduce((result, item) => {

                result.push(product_inventory_data(item));
                return result;
            }, []);
            // SAVE PRODUCT TO LOCAL STORAGE
            PRODUCT_STORAGE.SAVE_PRODUCT(userId, payload)
            store.dispatch({
                type: INVENTORY_ACTION.FETCH_USER_PRODUCT,
                payload
            })
        } catch (e) {
            throw e;
        }
    },

    FETCH_HISTORY: async (type) => {
        try {
            // FETCH INVENTORY HISTORY FROM API
            let { data = {} } = await client.query({
                query: getInventoryHistory,
                fetchPolicy: 'network-only',
                variables: {
                    type
                }
            });
            let { getUserInventoryHistory = [] } = data;
            let payload = getUserInventoryHistory.map(inventory_history);

            return payload;
        } catch (e) {
            throw e;
        }
    },

    EXPORT_PRODUCT: async (employeeId, products, confirmOption = false) => {
        try {
            let { data = {} } = await client.mutate({
                mutation: exportProductToPOS,
                variables: {
                    employeeId,
                    products,
                    confirmOption
                }
            })
            let { requestPOSToCompany = {}} = data;
            return requestPOSToCompany;
        } catch (e) {
            throw e;
        }
    }
};