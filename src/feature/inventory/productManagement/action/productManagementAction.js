import gql from "graphql-tag";

export const getProductInventory = gql`
    query getCurrentUserInventory($type: String!, $userId: String!, $limit: Int, $skip: Int) {
        getUserProductInventory(type: $type, userId: $userId, limit: $limit, skip: $skip) {
            ... on ProductInventory {
                product {
                    _id
                    name
                    price {
                        name
                        price
                        currency {
                            name
                            symbol
                        }
                    }
                    unit
                    categoryId {
                        _id
                        name
                        description
                    }
                }
                quantity
            }
            ... on ProductInventoryCompany {
                companyId
            }
            ... on ProductInventoryEmployee {
                employeeId
            }
        }
    }
`;