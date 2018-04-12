import {TRANSACTION, USER} from '../../constant/constant';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    transactionAmount: 0,
    transaction: [],
    asyncTransaction: [],
    asyncIssueRefund: [],
    asyncUpdateTransaction: [],
    currentTransaction: {},
};

function updateTransaction(state, transaction) {
    if (state.length === 0) {
        return transaction
    } else {
        for (let i = 0; i < transaction.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (transaction[i]._id === state[j]._id) {
                    state.splice(j, 1);
                    state.splice(j, 0, transaction[i]);
                    break;
                } else {
                    if (j === state.length - 1) {
                        state.push(transaction[i])
                    }
                }
            }

        }
    }
    state.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return state

}

function createTransaction(state, transaction) {
    state.splice(0, 0, transaction);
    return state
}

function adjustTransaction(state, transaction) {
    for (let j = 0; j < state.length; j++) {
        if (transaction._id === state[j]._id) {
            state.splice(j, 1);
            state.splice(j, 0, transaction);
            break;
        }
    }
    return state
}

function issueRefundTransactionLocal(state, transaction) {
    for (let j = 0; j < state.length; j++) {
        if (transaction._id === state[j]._id) {
            let newTransaction = Object.assign({}, state[j]);
            newTransaction.issueRefundReason = transaction.issueRefundReason;
            newTransaction.refundDate = transaction.refundDate;
            newTransaction.issueRefund = true;

            state.splice(j, 1);
            state.splice(j, 0, newTransaction);
            break;
        }
    }
    return state
}

function removeTransactionAsyncLocal(state, transaction) {
    for (let i = 0; i < state.length; i++) {
        if (state[i]._id === transaction._id) {
            state.splice(i, 1);
        }
    }
    return state
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case TRANSACTION.GET_TRANSACTION: {
            let newTransaction = updateTransaction(state.transaction, action.payload);
            return {
                ...state,
                transaction: [...newTransaction]
            }
        }
        case TRANSACTION.GET_TRANSACTION_AMOUNT: {
            return {
                ...state,
                transactionAmount: action.payload
            }
        }
        case TRANSACTION.CREATE_TRANSACTION: {
            let newTransaction = createTransaction(state.transaction, action.payload);
            return {
                ...state,
                transaction: [...newTransaction]
            }
        }
        case TRANSACTION.ASYNC_CREATE_TRANSACTION: {
            return {
                ...state,
                asyncTransaction: [action.payload, ...state.asyncTransaction]
            }
        }
        case TRANSACTION.ASYNC_ISSUE_REFUND: {
            let newTransaction = issueRefundTransactionLocal(state.transaction, action.payload);
            return {
                ...state,
                transaction: [...newTransaction],
                asyncIssueRefund: [action.payload, ...state.asyncIssueRefund],
                currentTransaction: {
                    ...state.currentTransaction,
                    issueRefund: true,
                    refundDate: action.payload.refundDate,
                    issueRefundReason: action.payload.issueRefundReason
                }
            }
        }
        case TRANSACTION.REMOVE_TRANSACTION_ASYNC_LOCAL: {
            let newTransactionAsync = removeTransactionAsyncLocal(state.asyncTransaction, action.payload);
            return {
                ...state,
                asyncTransaction: [...newTransactionAsync]
            }
        }
        case TRANSACTION.REMOVE_ISSUE_REFUND_ASYNC_LOCAL: {
            let newTransactionAsync = removeTransactionAsyncLocal(state.asyncIssueRefund, action.payload);
            return {
                ...state,
                asyncIssueRefund: [...newTransactionAsync]
            }
        }
        case TRANSACTION.ADJUST_TRANSACTION: {
            let newTransaction = adjustTransaction(state.transaction, action.payload);
            return {
                ...state,
                transaction: [...newTransaction]
            }
        }
        case TRANSACTION.ADJUST_TRANSACTION_NOT_CREATED: {
            let newTransaction = adjustTransaction(state.asyncTransaction, action.payload);
            return {
                ...state,
                asyncTransaction: [...newTransaction]
            }
        }
        case TRANSACTION.SELECT_TRANSACTION: {
            return {
                ...state,
                currentTransaction: action.payload,
            }
        }
        case REHYDRATE: {
            if (action.payload && action.payload.transactionReducer) {

                return {
                    ...state,
                    transactionAmount: action.payload.transactionReducer.transactionAmount,
                    transaction: action.payload.transactionReducer.transaction,
                    asyncTransaction: action.payload.transactionReducer.asyncTransaction,
                    asyncIssueRefund: action.payload.transactionReducer.asyncIssueRefund,
                    asyncUpdateTransaction: action.payload.transactionReducer.asyncUpdateTransaction,
                    currentTransaction: action.payload.transactionReducer.currentTransaction,

                };

            } else {
                return {
                    ...state
                }
            }

        }
        case USER.LOG_OUT: {
            return {
                transactionAmount: 0,
                transaction: [],
                asyncTransaction: [],
                asyncIssueRefund: [],
                asyncUpdateTransaction: [],
                currentTransaction: {},
            }
        }
        default:
            return {
                ...state
            };
    }
}