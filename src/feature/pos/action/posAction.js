import gql from "graphql-tag";
import {client} from "../../../../App";
import store from "../../../store/store";

const getAllPOS = gql`
    query getAllPOS {
        getAllPOS {
            _id
            profile {
                name
                address
                phoneNumber
            }
            ...on CurrentEmployee {
                username
                companyId
            }
        }
    }
`;

const createPOS = gql`
    mutation addNewPOS($username: String!, $password: String!, $name: String!, $address: String!, $phoneNumber: String!) {
        addNewPOS(username: $username, password: $password, name: $name, address: $address, phoneNumber: $phoneNumber) {
            _id
            profile {
                name
                address
                phoneNumber
            }
            ...on CurrentEmployee {
                username
                companyId
            }
        }
    }
`;

export const POS_MANAGEMENT = {
    FETCH_ALL_POS: async () => {
        let { data } = await client.query({
            query: getAllPOS,
            fetchPolicy: 'network-only'
        });
        let pos = data.getAllPOS;
        let payload = pos.map(item => {
            let { profile = {} } = item;
            return {
                _id: item._id || '',
                companyId: item.companyId || null,
                profile: {
                    address: profile.address || '',
                    name: profile.name || '',
                    phoneNumber: profile.phoneNumber || '',
                },
                username: item.username || ''
            }
        });
        console.log("FETCH POS - ", data);
        store.dispatch({
            type: POS_MANAGEMENT.FETCH_ALL_POS,
            payload
        })
    },
    ADD_POS: async (username, password, name, address, phoneNumber) => {
        let { data } = await client.query({
            query: createPOS,
            fetchPolicy: 'network-only',
            variables: {
                username,
                password,
                name,
                address,
                phoneNumber
            }
        });
        console.log("FETCH DATA - ", data);
    }
};

export {getAllPOS, createPOS};