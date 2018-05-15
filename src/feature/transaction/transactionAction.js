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

function asyncIssueRefundAction(payload) {
    return {
        type: TRANSACTION.ASYNC_ISSUE_REFUND,
        payload
    }
}

function asyncUpdateTransactionAction(payload) {
    return {
        type: TRANSACTION.ASYNC_UPDATE_TRANSACTION,
        payload
    }
}

function removeTransactionAsyncLocalAction(payload) {
    return {
        type: TRANSACTION.REMOVE_TRANSACTION_ASYNC_LOCAL,
        payload
    }
}

function removeIssueRefundAsyncLocalAction(payload) {
    return {
        type: TRANSACTION.REMOVE_ISSUE_REFUND_ASYNC_LOCAL,
        payload
    }
}

function removeUpdateTransactionAsyncLocalAction(payload) {
    return {
        type: TRANSACTION.REMOVE_UPDATE_TRANSACTION_ASYNC_LOCAL,
        payload
    }
}

function adjustTransactionAction(payload) {
    return {
        type: TRANSACTION.ADJUST_TRANSACTION,
        payload
    }
}

function adjustTransactionNotCreatedAction(payload) {
    return {
        type: TRANSACTION.ADJUST_TRANSACTION_NOT_CREATED,
        payload
    }
}

function selectTransactionAction(payload) {
    return {
        type: TRANSACTION.SELECT_TRANSACTION,
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
            // console.warn(transaction.data.getTransactionEmployee)
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
                fetchPolicy: "network-only"
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
                    paid: [{date: new Date(), amount: paid}],
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
                        paid: item.paid,
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

export function issueRefund(transaction, reason, productItems) {
    return async (dispatch, getState) => {
        try {

            if (transaction.async) {
                let newLocalTransaction = Object.assign({}, transaction);
                newLocalTransaction.issueRefundReason = reason;
                newLocalTransaction.refundDate = new Date();
                newLocalTransaction.issueRefund = true;
                dispatch(adjustTransactionNotCreatedAction(newLocalTransaction));
                dispatch(asyncIssueRefundAction({
                    _id: transaction._id,
                    issueRefundReason: reason,
                    refundDate: new Date(),
                    productItems: productItems
                }));
                dispatch(selectTransaction(newLocalTransaction))
            } else {
                const issueRefund = await client.mutate({
                    mutation: MUTATION.ISSUE_REFUND,
                    variables: {
                        _id: transaction._id,
                        issueRefundReason: reason,
                        refundDate: new Date(),
                        productItems: productItems
                    }
                });
                dispatch(adjustTransactionAction(issueRefund.data.issueRefundTransaction));
                dispatch(selectTransaction(issueRefund.data.issueRefundTransaction))
            }
        } catch (e) {
            dispatch(asyncIssueRefundAction({
                _id: transaction._id,
                issueRefundReason: reason,
                refundDate: new Date(),
                productItems: productItems
            }));
            console.warn("transactionAction.js-issueRefund-" + e)
        }
    }
}

export function issueRefundAsync(issueRefundAsync) {
    return async (dispatch, getState) => {
        try {
            for (item of issueRefundAsync) {
                const issueRefund = await client.mutate({
                    mutation: MUTATION.ISSUE_REFUND,
                    variables: {
                        _id: item._id,
                        issueRefundReason: item.issueRefundReason,
                        refundDate: item.refundDate,
                        productItems: item.productItems
                    }
                });
                dispatch(removeIssueRefundAsyncLocalAction(item));
                dispatch(adjustTransactionAction(issueRefund.data.issueRefundTransaction))
            }
        } catch (e) {
            console.warn("transactionAction.js-issueRefundAsync-" + e)
        }

    }
}

export function selectTransaction(item) {
    return async (dispatch, getState) => {
        try {
            dispatch(selectTransactionAction(item))

        } catch (e) {
            console.warn("transactionAction.js-selectTransaction-" + e)
        }
    }
}

export function updateTransaction(transaction, dueDate, paid) {
    return async (dispatch, getState) => {
        try {
            if (transaction.async) {

                let newLocalTransaction = Object.assign({}, transaction);
                newLocalTransaction.dueDate = dueDate;
                newLocalTransaction.paid.push({date: new Date(), amount: paid});
                newLocalTransaction.description = transaction.description;
                dispatch(adjustTransactionNotCreatedAction(newLocalTransaction));
                dispatch(selectTransaction(newLocalTransaction))
            } else {
                const updateTransaction = await client.mutate({
                    mutation: MUTATION.UPDATE_TRANSACTION,
                    variables: {
                        _id: transaction._id,
                        dueDate: dueDate,
                        paid: {date: new Date(), amount: paid},
                        description: transaction.description,

                    }
                });
                dispatch(adjustTransactionAction(updateTransaction.data.updateTransaction));
                dispatch(selectTransaction(updateTransaction.data.updateTransaction))
            }
        } catch (e) {
            dispatch(asyncUpdateTransactionAction({
                _id: transaction._id,
                dueDate: dueDate,
                paid: {date: new Date(), amount: paid},
                description: transaction.description,
            }));

            console.warn("transactionAction.js-updateTransaction-" + e)
        }
    }
}
