import configs from "../../../configs";
import gql from 'graphql-tag';

export async function companyLogin(email, password) {
    try {
        let response = await fetch(`${configs.api}/account/company/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        });
        response = await response.json();

        if(response.errors) {
            throw new Error(response.errors[0].message);
        }
        return response;
    }
    catch (e) {
        console.warn("error - companyLogin");
        throw e;
    }
}

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

export const getCurrentUser = gql`
    query getCurrentUser {
        currentUser {
            ...userProfile
            ... on CurrentCompany {
                email
            }
            ... on CurrentEmployee {
                username
                companyId
            }
        }
    }
    ${userProfile}
`;