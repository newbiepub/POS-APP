import gql from "graphql-tag";
import {client} from "../../../../App";
import store from "../../../store/store";
import {POS_ACTION} from "../../../constant/actionTypes";
import {pos_data} from "../../../api/dataHandler/pos";

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
        store.dispatch({
            type: POS_ACTION.FETCH_ALL,
            payload
        })
    },
    ADD_POS: async (username, password, name, address, phoneNumber) => {
        try {
            // Add optimistic
            let localPos = {
                _id: Math.round(Math.random() * -1000000).toString(),
                profile: {
                    name: name,
                    address: address,
                    phoneNumber: phoneNumber
                },
                username: username,
                companyId: ""
            }
            store.dispatch({
                type: POS_ACTION.ADD_OPTIMISTIC,
                payload: localPos
            })
            // Fetch data
            let { data } = await client.mutate({
                mutation: createPOS,
                fetchPolicy: 'network-only',
                variables: {
                    username,
                    password,
                    name,
                    address,
                    phoneNumber
                }
            });
            // Add data from server
            data = data.addNewPOS;
            data = data && pos_data(data);
            store.dispatch({
                type: POS_ACTION.ADD,
                payload: {_id: localPos._id, data}
            })
        } catch (e) {
            console.warn(e.message);
            alert('Đã có lỗi xảy ra !');
        }
    }
};

export {getAllPOS, createPOS};