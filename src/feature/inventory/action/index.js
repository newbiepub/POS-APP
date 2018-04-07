import {client} from "../../../../App";
import {getProductInventory} from "../productManagement/action/productManagementAction";
import store from "../../../store/store";
import {INVENTORY_ACTION} from "../../../constant/actionTypes";
import {PRODUCT_STORAGE} from "../../../localStorage/index";

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
                let { product = {} } = item;
                result.push({
                    employeeId: item.employeeId,
                    companyId: item.companyId,
                    product: {
                        categoryId: product.categoryId,
                        name: product.name,
                        price: product.price || [],
                        unit: product.unit || '',
                        _id: product._id || ''
                    },
                    quantity: item.quantity || 0
                });
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
    }
};