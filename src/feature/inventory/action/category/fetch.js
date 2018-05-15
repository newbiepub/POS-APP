import gql from "graphql-tag";
import {client} from "../../../../../App";
import {CATEGORY_STORAGE} from "../../../../localStorage/category/index";

const FETCH_CATEGORY = gql`
    query FETCH_CATEGORY {
        FETCH_CATEGORY: categories {
            _id
            name
        }
    }
`

export const fetchCategory = async (userId) => {
    try {
        let response, data;

        response = await client.query({
            query: FETCH_CATEGORY,
            fetchPolicy: 'network-only'
        });

        if(response.errors) throw new Error(response.errors[0].message);

        data = response.data.FETCH_CATEGORY;
        await CATEGORY_STORAGE.SAVE_CATEGORY(userId, data)
        return data;
    } catch (e) {
        return await CATEGORY_STORAGE.GET_CATEGORY(userId);
    }
}