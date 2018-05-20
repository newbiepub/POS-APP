import gql from "graphql-tag";
import {client} from "../../../../../App";
import store from "../../../../store/store";
import {POS_ACTION} from "../../../../constant/actionTypes";

const UPDATE_POS = gql`
    mutation UPDATE_POS ($employeeId: String!, $username: String!, $password: String,
    $name: String, $address: String, $phoneNumber: String) {
        UPDATE_POS (employeeId: $employeeId, username: $username, password: $password,
            name: $name, address: $address, phoneNumber: $phoneNumber) {
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
`

    export const update = async (employeeId, username, password, name, address, phoneNumber) => {
    try {
        let insertItem = {
            employeeId,
            username,
            password,
            name,
            address,
            phoneNumber
        }
        store.dispatch({
            type: POS_ACTION.UPDATE,
            payload: insertItem
        })
        let response = await client.mutate({
            mutation: UPDATE_POS,
            variables: insertItem
        });
        if(response.errors) throw new Error(response.errors[0].message);
        return response.data.UPDATE_POS;
    } catch (e) {
        throw e;
    }
}