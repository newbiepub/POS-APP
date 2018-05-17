import gql from "graphql-tag";
import {client} from "../../../../../../App";

const UPDATE_PRODUCT = gql`
    mutation UPDATE_PRODUCT($productId: String!, $name: String, $quantity: Int, $importPrice: Float,$description: String, $unit: String, $productCode: String) {
        UPDATE_PRODUCT(productId: $productId, name: $name, quantity: $quantity, importPrice: $importPrice,
            description:$description, unit:$unit,productCode:$productCode) {
            success
        }
    }


`

export const updateProduct = async (productId, name, quantity, importPrice,
                                    description, unit,productCode) => {
    try {
        let response = await client.mutate({
            mutation: UPDATE_PRODUCT,
            variables: {
                productId,
                name,
                quantity,
                importPrice,
                description,
                unit,
                productCode
            }
        })
        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.UPDATE_PRODUCT
    } catch (e) {
        throw e;
    }
}