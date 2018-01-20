import gql from "graphql-tag";

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

export {getAllPOS, createPOS};