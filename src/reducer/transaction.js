import {TRANSACTION} from "../constant/constant";

const initialState = {
    paymentMethod: ["Trả trước", "Trả sau"],
    paymentStatus: ["Đã thanh toán", "Chưa thanh toán"],
    transaction: []
};

export default transactionReducer(initialState);

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
            case TRANSACTION.GET_TRANSACTION: {
                return {
                    ...state,
                    transaction: action.payload
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