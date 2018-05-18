import {client} from "../../../../../../App";
import gql from "graphql-tag";
import {inventory_order_data} from "../../../../../api/dataHandler/inventory";
import store from "../../../../../store/store";
import {INVENTORY_ACTIVITY_ACTION} from "../../../../../constant/actionTypes";

const FETCH_INVENTORY_ACTIVITY_COMPANY = gql`
    query FETCH_INVENTORY_ACTIVITY_COMPANY {
        FETCH_INVENTORY_ACTIVITY_COMPANY {
            _id
            products {
                _id
                name
                quantity
            }
            totalPrice
            from {
                _id
            }
            to {
                _id
                name
                phone
                email
                address
            }
            totalQuantity
            totalPrice
            dateRequest
        }
    }
`

export const fetchInventoryActivity = async () => {
    try {
        let activity, response;

        response = await client.query({
            query: FETCH_INVENTORY_ACTIVITY_COMPANY,
            fetchPolicy: 'network-only'
        })
        if(response.errors) throw new Error(response.errors[0].message);
        activity = response.data.FETCH_INVENTORY_ACTIVITY_COMPANY;
        activity = activity.map(item => inventory_order_data(item));
        store.dispatch({
            type: INVENTORY_ACTIVITY_ACTION.FETCH_INVENTORY_ACTIVITY_COMPANY,
            payload: activity
        });

        return activity;
    }
    catch(e) {
        console.warn("error - fetchInventoryActivity", e.message);
        throw e;
    }
}