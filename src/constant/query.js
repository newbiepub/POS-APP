import gql from 'graphql-tag';

export const QUERY = {
    PRODUCTS: gql`
        query {
            products {
                _id
                name
                productCode
                unit
                description
                categoryId {
                    _id
                    name
                }
                price {
                    _id
                    name
                    price
                    currency {
                        name
                    }
                }
            }
        }`,
    CATEGORIES: gql`
        query {
            categories {
                _id
                name
                description
            }
        }`,
    INVENTORY_PRODUCT:gql`
        query {
            getUserProductInventory(type: "employee") {
                quantity
                product {
                    _id
                    name
                    unit
                }
                description
            }
        }`,
    PAYMENT_STATUS:gql`
        query {
            PaymentStatus {
                _id
                name
            }
        }`,
    PAYMENT_METHOD:gql`
        query {
            PaymentMethod {
                _id
                name
            }
        }`,
};
