import gql from "graphql-tag";
import {client} from "../../../../../App";

const CREATE_CATEGORY = gql`
    mutation CREATE_CATEGORY ($name: String!, $description: String, $products: [String]) {
        CREATE_CATEGORY (name: $name, description: $description, products: $products) {
            _id
            name
        }
    }
`

export const createCategory = async (name, description = '', products = []) => {
    try {
        let response = await client.mutate({
            mutation: CREATE_CATEGORY,
            variables: {
                name, description, products
            }
        });

        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.CREATE_CATEGORY;
    } catch (e) {
        throw e;
    }
}