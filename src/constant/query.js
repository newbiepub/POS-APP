import gql from 'graphql-tag';

export const QUERY = {
    CURRENT_USER: gql`
        query {
            currentUser {
                _id
                profile {
                    name
                    address
                    phoneNumber
                }
            }
        }`,
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
    INVENTORY_PRODUCT: gql`
        query getUserProductInventory($userId: String!){
            getUserProductInventory(type: "employee", userId: $userId) {
                product {
                    _id
                    name
                    price {
                        _id
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
                    }
                    productCode
                }
                quantity
                description
                ... on updateProductInventoryQuantityFragment{
                    quantity
                }
            }

        }`,
    PAYMENT_STATUS: gql`
        query {
            paymentStatus {
                _id
                name
                type
            }
        }`,
    PAYMENT_METHOD: gql`
        query {
            paymentMethod {
                _id
                name
                type
            }
        }`,
    CURRENCY: gql`
        query {
            currency(type:"employee"){
                _id
                name
                symbol
            }
        }`,
    TRANSACTION: gql`
        query {
            getTransactionEmployee{
                _id
                productItems{
                    _id
                    productName
                    quantity
                    price{
                        _id
                        name
                        price
                        currency{
                            name
                            symbol
                        }
                    }
                    totalPrice
                    unit
                    discount
                }
                type
                issueRefund
                issueRefundReason
                date
                paymentStatus{
                    _id
                    type
                    name
                }
                paymentMethod{
                    _id
                    type
                    name
                }
                dueDate
                paymentMethod{
                    _id
                    name
                    type
                }
                paymentStatus{
                    _id
                    name
                    type
                }
                totalQuantity
                totalPrice
                paid
                description
            }
        }
    `
};
