import gql from "graphql-tag";
import {client} from "../../../../../App";

const CREATE_DISCOUNT = gql`
    mutation CREATE_DISCOUNT($products: [String]!, $employeeIds: [String]!,
    $appliedDate: Date, $dueDate: Date, $name: String!, $description: String,
    $type: String!, $value: Float!) {
        CREATE_DISCOUNT(products: $products, employeeIds: $employeeIds,
            appliedDate: $appliedDate, dueDate: $dueDate,
            name: $name, description: $description, type: $type, value: $value) {
            products,
            companyId
            employeeIds
            name
            type
            value
            appliedDate
            dueDate
            createdAt
        }
    }


`

export const creatDiscount = async (name = '', description = '', appliedDate = null, dueDate = null,
                                    type = '', value = 0, products = [], employeeIds = []) => {
    try {
        let response = await client.mutate({
            mutation: CREATE_DISCOUNT,
            variables: {
                name, description, appliedDate, dueDate, type, value,
                products, employeeIds
            }
        })
        return response.data;
    } catch (e) {
        throw e;
    }
}