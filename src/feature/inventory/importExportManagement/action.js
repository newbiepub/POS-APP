import gql from "graphql-tag";

// language=GraphQL format=false
export const getInventoryHistory = gql`
    query userInventoryHistory($type: String!) {
        getUserInventoryHistory (type: $type) {
            _id
            products {
                name
                quantity
                importPrice
                prices {
                    name
                    price
                }
                unit
                productCode
            }
            type
            totalQuantity
            totalPrice
            dateDelivered
            dateReceived
        }
    }
`;