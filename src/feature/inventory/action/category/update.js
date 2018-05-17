import {client} from "../../../../../App";
import gql from "graphql-tag";

const UPDATE_CATEGORY = gql`
    mutation UPDATE_CATEGORY ($categoryId: String!, $name: String!, $products: [String]) {
        UPDATE_CATEGORY(categoryId: $categoryId, name: $name, products: $products) {
            success
        }
    }
`

export const updateCategory = async (categoryId, name, products = []) => {
    try {
        let response = await client.mutate({
            mutation: UPDATE_CATEGORY,
            variables: {
                categoryId,
                name,
                products
            }
        });

        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.UPDATE_CATEGORY;
    } catch (e) {
        throw e;
    }
}