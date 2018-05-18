import gql from "graphql-tag";
import {client} from "../../../../../../App";

const APPROVE_ORDER = gql`
    mutation CREATE_INVENTORY_ORDER($employeeId: String!, $products: [ProductExport], $activityId: String) {
        CREATE_INVENTORY_ORDER (employeeId: $employeeId, products: $products, activityId: $activityId) {
            success
        }
    }
`

export const approveOrder = async (employeeId, products, activityId) => {
    try {
        let response;

        response = await client.mutate({
            mutation: APPROVE_ORDER,
            variables: {
                employeeId,
                products,
                activityId
            }
        })
        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.CREATE_INVENTORY_ORDER;
    }
    catch(e) {
        console.warn("error - approveOrder = ", e.message)
        alert('ĐÃ CÓ LỖI XẢY RA');
    }
}