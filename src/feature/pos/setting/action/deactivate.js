import gql from "graphql-tag";
import {client} from "../../../../../App";
import store from "../../../../store/store";
import {POS_ACTION} from "../../../../constant/actionTypes";

const DEACTIVATE_POS = gql`
    mutation DEACTIVATE_POS($employeeId: String!) {
        DEACTIVATE_POS(employeeId: $employeeId) {
            _id
            profile {
                name
                address
                phoneNumber
            }
            username
            status
        }
    }
`;

export const deactivate = async (employeeId, status) => {
    try {
        store.dispatch({
            type: POS_ACTION.DEACTIVATE,
            payload: {
                employeeId,
                status
            }
        })
        let response = await client.mutate({
            mutation: DEACTIVATE_POS,
            variables: {
                employeeId
            }
        });
        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.DEACTIVATE_POS
    } catch (e) {
        throw e;
    }
}