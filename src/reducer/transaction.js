import {TRANSACTION} from "../constant/constant";
import moment from '../component/momentJs'

const initialState = {
    paymentMethod: ["Trả trước", "Trả sau"],
    paymentStatus: ["Đã thanh toán", "Chưa thanh toán"],
    transaction: [],
    currentNumberOfTransaction:0,
    transactionAmount: 0,
    loading: true
};

export default transactionReducer(initialState);

function sortDataByDate(newTransaction, oldTransaction) {
    for (var i = 0; i < oldTransaction.length; i++) {
        if (newTransaction.length === 0) {
            newTransaction.push({title: oldTransaction[i].date, data: [oldTransaction[i]]});
        } else {
            for (var j = 0; j < newTransaction.length; j++) {

                if (moment(oldTransaction[i].date).format("DD/MM/YYYY") === moment(newTransaction[j].title).format("DD/MM/YYYY")) {
                    newTransaction[j].data.push(oldTransaction[i]);
                    break;
                } else {
                    if (j === newTransaction.length - 1) {
                        newTransaction.push({title: oldTransaction[i].date, data: [oldTransaction[i]]});
                        break;
                    }
                }
            }
        }
    }
}

function transactionReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case TRANSACTION.CREATE_TRANSACTION: {
                return {
                    ...state,
                }
            }
            case TRANSACTION.GET_PAYMENT_METHOD: {
                return {
                    ...state,
                    paymentMethod: action.payload
                }
            }
            case TRANSACTION.GET_PAYMENT_STATUS: {
                return {
                    ...state,
                    paymentStatus: action.payload
                }
            }
            case TRANSACTION.COUNT_TRANSACTION: {
                return {
                    ...state,
                    transactionAmount: action.payload
                }
            }
            case TRANSACTION.GET_TRANSACTION: {

                sortDataByDate(state.transaction, action.payload);
                return {
                    ...state,
                    loading: false,
                    currentNumberOfTransaction: state.currentNumberOfTransaction + action.payload.length,
                    transaction: [...state.transaction]
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}