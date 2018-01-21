import gql from "graphql-tag";

export const getProductInventory = gql`
    query getCurrentUserInventory($type: String!, $userId: String!) {
        getUserInventory(type: $type, userId: $userId) {
            productItem {
                productId {
                    _id
                    name
                    unit
                    price {
                        name
                        price
                        currency {
                            _id
                            name
                        }
                    }
                }
                quantity
            }
            ingredientItem {
                ingredientId
                quantity
            }
            ... on InventoryCompany {
                companyId
            }
            ... on InventoryEmployee {
                employeeId
            }
        }
    } 
`;