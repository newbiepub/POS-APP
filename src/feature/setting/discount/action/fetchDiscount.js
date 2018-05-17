import gql from 'graphql-tag';
import {client} from "../../../../../App";
import store from "../../../../store/store";
import {DISCOUNT_ACTION} from "../../../../constant/actionTypes";
import {discount_data} from "../../../../api/dataHandler/discount";

const FETCH_ALL_DISCOUNT = gql`
    query FETCH_ALL_DISCOUNT{
        discounts : FETCH_ALL_DISCOUNT {
            _id
            products
            companyId
            employeeIds
            name
            description
            type
            value
            appliedDate
            dueDate
            createdAt
        }
    }
`;

export const fetchDiscount = async () => {
    try {
        let response, data;

        response = await client.query({
            query: FETCH_ALL_DISCOUNT,
            fetchPolicy: 'network-only'
        });
        if(response.errors) throw new Error(response.errors[0].message);
        data = response.data.discounts;
        data = data.map(discount_data);
        store.dispatch({
            type: DISCOUNT_ACTION.FETCH_ALL_DISCOUNT,
            payload: data
        })
    } catch (e) {
        alert('Đã có lỗi xảy ra !');
        throw e;
    }
}