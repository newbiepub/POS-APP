import gql from 'graphql-tag';
import {client} from "../../../../../App";
import {activity_logger} from "../../../../api/dataHandler/activityLogger";
import store from "../../../../store/store";
import {INVENTORY_ACTIVITY_ACTION} from "../../../../constant/actionTypes";

const FETCH_INVENTORY_LOGS = gql`
    query FETCH_INVENTORY_LOGS{
        FETCH_LOGS {
            message
            data
            type
            createdAt
        }
    }
`;

export const fetchLog = async () => {
    try {
        let data, response;

        response = await client.query({
            query: FETCH_INVENTORY_LOGS,
            fetchPolicy: 'network-only'
        })
        if(response.errors) throw new Error(data.errors[0].message);
        data = response.data.FETCH_LOGS;
        data = data.map(activity_logger)
        store.dispatch({
            type: INVENTORY_ACTIVITY_ACTION.FETCH_LOGS,
            payload: data
        })
    } catch (e) {
        console.warn(e.message);
        switch (e.message) {
            default:
                return alert('Đã có lỗi xảy ra')
        }
        throw e;
    }
}