import {TRANSACTION, USER} from '../../constant/constant';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    transactionAmount: 0,
    transaction: []
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
function createTransaction(state, transaction){
    state.splice(0, 0,transaction);

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
        case TRANSACTION.CREATE_TRANSACTION:{
            let newTransaction = createTransaction(state.transaction, action.payload);
            return {
                ...state,
                transaction: [...newTransaction]
            }
        }
        case REHYDRATE: {
            if (action.payload && action.payload.transactionReducer) {

                return {
                    ...state,
                    transactionAmount: action.payload.transactionReducer.transactionAmount,
                    transaction: action.payload.transactionReducer.transaction
                };

            } else {
                return {
                    ...state
                }
            }

        }
        default:
            return {
                ...state
            };
    }
}