import configs from "../../../configs";
import gql from 'graphql-tag';
import {client} from "../../../../App";
import store from "../../../store/store";
import {AUTH_ACTION} from "../../../constant/actionTypes";

const userProfile = gql`
    fragment userProfile on User {
        _id
        profile {
            name
            address
            phoneNumber
        }
    }
`;

const getCurrentUser = gql`
    query getCurrentUser {
        currentUser {
            ...userProfile
            ... on CurrentCompany {
                email,
                status
            }
            ... on CurrentEmployee {
                username
                companyId,
                status
            }
        }
    }
    ${userProfile}
`;

export const AUTH = {
    LOGIN: async (email, password) => {
        try {
            let response = await fetch(`${configs.api}/account/company/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            response = await response.json();

            if(response.errors) {
                throw new Error(response.errors[0].message);
            }
            return response;
        } catch (e) {
            console.log("ERROR - AUTH - LOGIN");
            throw new Error(e.message)
        }
    },
    CURRENT_USER: async () => {
        try {
            let { data } = await client.query({
                query: getCurrentUser,
                fetchPolicy: 'network-only'
            });
            let { currentUser } = data;
            let { profile } = currentUser;

            store.dispatch({
                type: AUTH_ACTION.CURRENT_USER,
                payload: {
                    _id: currentUser._id || '',
                    email: currentUser.email || '',
                    profile: {
                        name: profile.name || '',
                        phoneNumber: profile.phoneNumber || '',
                        address: profile.address || ''
                    },
                }
            })
        } catch (e) {
            throw e;
        }
    }
};