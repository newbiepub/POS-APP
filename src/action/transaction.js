import {TRANSACTION} from '../constant/constant';
import url from '../config';

function getPaymentMethodAction(payload) {
    return {
        type: TRANSACTION.GET_PAYMENT_METHOD,
        payload
    }
}

function getPaymentStatusAction(payload) {
    return {
        type: TRANSACTION.GET_PAYMENT_STATUS,
        payload
    }
}

function countTransactionAction(payload) {
    return {
        type: TRANSACTION.COUNT_TRANSACTION,
        payload
    }
}

function getTransactionAction(payload) {
    return {
        type: TRANSACTION.GET_TRANSACTION,
        payload
    }
}

export function getPayment(access_token) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let paymentMethod = await fetch(`${api}/api/transaction/getPaymentMethod?access_token=${access_token}`);
                paymentMethod = await paymentMethod.json();
                dispatch(getPaymentMethodAction(paymentMethod.name));
                let paymentStatus = await fetch(`${api}/api/transaction/getPaymentStatus?access_token=${access_token}`);
                paymentStatus = await paymentStatus.json();
                dispatch(getPaymentStatusAction(paymentStatus.name));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function getTransaction(access_token, limit, skip) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let transaction = await fetch(`${api}/api/transaction/getTransaction?access_token=${access_token}&limit=${limit}&skip=${skip}`);
                transaction = await transaction.json();
                dispatch(getTransactionAction(transaction));
                resolve(true);
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}
export function countTransaction(access_token) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let transactionNumber = await fetch(`${api}/api/transaction/countTransaction?access_token=${access_token}`);
                transactionNumber = await transactionNumber.json();
                dispatch(countTransactionAction(transactionNumber));
                resolve(true);
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function createTransaction(access_token, data) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                let {api} = url;
                let result = await fetch(`${api}/api/transaction/createTransaction?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        transaction: data,
                    })
                });
                resolve(result)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}