import gql from "graphql-tag";
import {client} from "../../../../../App";

const UPDATE_DISCOUNT = gql`
    mutation UPDATE_DISCOUNT ($discountId: String!, $products: [String]!, $employeeIds: [String]!,
    $appliedDate: Date, $dueDate: Date, $name: String!, $description: String,
    $type: String!, $value: Float!) {
        UPDATE_DISCOUNT(discountId: $discountId, products: $products, employeeIds: $employeeIds,
            appliedDate: $appliedDate, dueDate: $dueDate,
            name: $name, description: $description, type: $type, value: $value) {
            _id
            products
            employeeIds
            name
            type
            value
            description
            appliedDate
            dueDate
            createdAt
        }
    }
`
export const updateDiscount = async (discountId = '', name = '', description = '', appliedDate = null, dueDate = null,
                                     type = '', value = 0, products = [], employeeIds = []) => {
    try {
        let response = await client.mutate({
            mutation: UPDATE_DISCOUNT,
            variables: {
                discountId,
                name,
                description,
                appliedDate,
                dueDate,
                type,
                value,
                products,
                employeeIds
            }
        })

        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.UPDATE_PRODUCT;
    } catch (e) {
        throw e;
    }
}