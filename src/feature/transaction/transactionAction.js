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
            console.warn("transactionAction.js-createTransaction-" + e)
        }

    }
}