import gql from "graphql-tag";

// language=GraphQL format=false
export const getInentoryHistory = gql`
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
                unit
                productCode
                quantity
            }
            type
            totalQuantity
            totalPrice
            dateDelivered
            dateReceived
        }
    }
`;