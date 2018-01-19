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

export {getAllPOS};