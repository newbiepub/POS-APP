import gql from "graphql-tag";

// language=GraphQL format=false
export const getInventoryHistory = gql`
    query userInventoryHistory($type: String!) {
        getUserInventoryHistory (type: $type) {
            _id
            products {
                _id
                name
                price {
                    name
                    price
                }
                quantity
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