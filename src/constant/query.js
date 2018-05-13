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
        query getUserProductInventory($userId: String!,$limit:Int, $skip: Int){
            getUserProductInventory(type: "employee", userId: $userId, limit:$limit, skip: $skip) {
                _id
                product {
                    _id
                    name
                    unit
                    categoryId {
                        _id
                        name
                    }
                    productCode
                    detail
                }
                quantity
                importPrice
                prices{
                    _id
                    name
                    price
                }
                description
                ... on updateProductInventoryQuantityFragment{
                    quantity
                }
            }

        }`,
    GET_AMOUNT_INVENTORY_PRODUCT: gql`
        query getAmountUserProductInventory($userId: String!){
            getAmountUserProductInventory(type: "employee", userId: $userId) {
                inventoryAmount
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
    query getTransactionEmployee($limit:Int, $skip: Int){
            getTransactionEmployee(limit:$limit, skip: $skip){
                _id
                createdAt
                productItems{
                    _id
                    productId
                    productName
                    quantity
                    priceImport
                    price{
                        name
                        price
                    }
                    totalPrice
                    unit
                    discounts{
                        _id
                        name
                        type
                        value
                        description
                        appliedDate
                        dueDate	
                        createdAt
                    }
                }
                type
                issueRefund
                issueRefundReason
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
                paid{
                    date
                    amount
                }
                customer{
                    name
                    email
                    address
                    phone
                    description
                }
                description
            }
        }
    `,
    GET_TRANSACTION_AMOUNT: gql`
        query {
            getAmountTransactionEmployee{
                transactionAmount
            }
        }`,
    GET_DISCOUNT_EMPLOYEE:gql`
        query{
              GET_DISCOUNT_EMPLOYEE{
                _id
                products
                name
                type
                value
                description
                appliedDate
                dueDate	
                createdAt
              }
        }`
};
