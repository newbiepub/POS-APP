import {TRANSACTION} from '../../constant/actionTypes';
import gql from 'graphql-tag';
import store from "../../store/store";
import {client} from '../../../App';

function getTransactionAction(payload) {
    return {
        type: TRANSACTION.GET_TRANSACTION,
        payload
    }
}

function getTransactionAmountAction(payload) {
    return {
        type: TRANSACTION.GET_TRANSACTION_AMOUNT,
        payload
    }
}

export async  function getTransaction(limit, skip) {
        try {
            const transaction = await client.query({
                query: gql`
                    query getTransactionEmployee($limit:Int, $skip: Int){
                        getTransactionEmployee(limit:$limit, skip: $skip){
                            _id
                            employeeId
                            companyId
                            createdAt
                            productItems{
                                _id
                                productId
                                productName
                                quantity
                                priceImport
                                category{
                                    categoryId
                                    categoryName
                                }
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
                variables: {
                    limit,
                    skip
                },
                fetchPolicy: "network-only"
            });
            store.dispatch(getTransactionAction(transaction.data.getTransactionEmployee))
        } catch (e) {
            console.warn("transactionAction.js-getTransaction-" + e)
        }
}

export async function getTransactionAmount() {
    try {
        let transactionAmount = await client.query({
            query: getAmountTransaction,
            fetchPolicy: "network-only"
        });
        store.dispatch(getTransactionAmountAction(transactionAmount.data.getAmountTransactionEmployee.transactionAmount))
    } catch (e) {
        console.warn("transactionAction.js-getTransactionAmount-" + e)
    }
}

const getAmountTransaction = gql`
    query {
        getAmountTransactionEmployee {
            transactionAmount
        }
    }`;