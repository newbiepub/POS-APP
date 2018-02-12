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
                        symbol
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
            paymentStatus {
                _id
                name
                type
            }
        }`,
    PAYMENT_METHOD:gql`
        query {
            paymentMethod {
                _id
                name
                type
            }
        }`,
    CURRENCY:gql`
        query {
            currency(type:"employee"){
                _id
                name
                symbol
            }
        }`,
};
