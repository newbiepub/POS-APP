import {TRANSACTION} from "../../constant/constant";
import {client} from '../../root';
import {QUERY} from "../../constant/query";
import {MUTATION} from "../../constant/mutation";

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

function createTransactionAction(payload) {
    return {
        type: TRANSACTION.CREATE_TRANSACTION,
        payload
    }
}

function asyncTransactionAction(payload) {
    return {
        type: TRANSACTION.ASYNC_CREATE_TRANSACTION,
        payload
    }
}

function removeTransactionAsyncLocalAction(payload) {
    return {
        type: TRANSACTION.REMOVE_TRANSACTION_ASYNC_LOCAL,
        payload
    }
}
export function getTransaction(limit, skip) {
    return async (dispatch, getState) => {
        try {
            const transaction = await client.query({
                query: QUERY.TRANSACTION,
                variables: {
                    limit,
                    skip
                },
                fetchPolicy: "network-only"
            });
            dispatch(getTransactionAction(transaction.data.getTransactionEmployee))
        } catch (e) {
            console.warn("transactionAction.js-getTransaction-" + e)
        }

    }
}

export function getTransactionAmount() {
    return async (dispatch, getState) => {
        try {
            const transactionAmount = await client.query({
                query: QUERY.GET_TRANSACTION_AMOUNT,

            });
            // console.warn(transactionAmount.data.getAmountTransactionEmployee.transactionAmount);
            dispatch(getTransactionAmountAction(transactionAmount.data.getAmountTransactionEmployee.transactionAmount))

        } catch (e) {
            console.warn("transactionAction.js-getTransactionAmount-" + e)
        }

    }
}

export function createTransaction(productItems, paymentStatus, paymentMethod, dueDate, totalQuantity, totalPrice, paid, description, customer) {
    return async (dispatch, getState) => {
        try {
            const transactionCreated = await client.mutate({
                mutation: MUTATION.CREATE_TRANSACTION,
                variables: {
                    productItems: productItems,
                    type: "pay",
                    paymentStatus: paymentStatus,
                    paymentMethod: paymentMethod,
                    dueDate: dueDate,
                    totalQuantity: totalQuantity,
                    totalPrice: totalPrice,
                    paid: {date: new Date(), amount: paid},
                    description: description,
                    customer: customer,
                    createdAt: new Date()
                }

            });
            dispatch(createTransactionAction(transactionCreated.data.createTransaction));
            // console.warn(transactionCreated)

        } catch (e) {
            let asyncTransaction = {
                _id: Math.round(Math.random() * -1000000).toString(),
                productItems: productItems,
                type: "pay",
                paymentStatus: paymentStatus,
                paymentMethod: paymentMethod,
                dueDate: dueDate,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice,
                paid: [{date: new Date(), amount: paid}],
                description: description,
                customer: customer,
                createdAt: new Date(),
                issueRefund: false,
                issueRefundReason: '',
                async: true,
            };
            dispatch(asyncTransactionAction(asyncTransaction));

            console.warn("transactionAction.js-createTransaction-" + e)
        }

    }
}

export function createTransactionAsync(productAsync) {
    return async (dispatch, getState) => {
        try {
            for (item of productAsync) {
                const transactionCreated = await client.mutate({
                    mutation: MUTATION.CREATE_TRANSACTION,
                    variables: {
                        productItems: item.productItems,
                        type: "pay",
                        paymentStatus: item.paymentStatus,
                        paymentMethod: item.paymentMethod,
                        dueDate: item.dueDate,
                        totalQuantity: item.totalQuantity,
                        totalPrice: item.totalPrice,
                        paid: item.paid[0],
                        description: item.description,
                        customer: item.customer,
                        createdAt: item.createdAt
                    }
                });
                dispatch(removeTransactionAsyncLocalAction(item));
                dispatch(createTransactionAction(transactionCreated.data.createTransaction));
            }
        } catch (e) {
            console.warn("transactionAction.js-createTransactionAsync-" + e)
        }

    }
}
