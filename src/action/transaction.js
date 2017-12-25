import {TRANSACTION,ASYNC_STORAGE} from '../constant/constant';
import url from '../config';
import {AsyncStorage} from 'react-native';
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

function getCurrentTaxAction(payload) {
    return {
        type: TRANSACTION.GET_CURRENT_TAX,
        payload
    }
}

function commitPurchaseAction(payload) {
    return {
        type: TRANSACTION.COMMIT_PURCHASE,
        payload
    }
}

function cleanTransactionAction() {
    return {
        type: TRANSACTION.CLEAN_TRANSACTION,
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

export function cleanTransaction() {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(cleanTransactionAction());
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
                if (result.status < 400) {
                    await dispatch(cleanTransaction());
                    await dispatch(countTransaction(access_token));
                    dispatch(getTransaction(access_token, 10, 0))
                }
                resolve(result)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function issueRefund(access_token, data) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                let {api} = url;
                let result = await fetch(`${api}/api/transaction/issueRefund?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        refund: data,
                    })
                });
                console.warn(JSON.stringify(result));
                resolve(result)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function commitPurchase(access_token, id) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                let {api} = url;
                let result = await fetch(`${api}/api/transaction/commitPurchase?access_token=${access_token}&id=${id}`)
                result = await result.json();
                if (result.status < 400) {
                    dispatch(commitPurchaseAction(id));
                    resolve(result);
                }

            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function getCurrentTax() {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
                token = JSON.parse(token);
                let {api} = url;
                let result = await fetch(`${api}/api/transaction/getTax?access_token=${token.access_token}`);
                result = await result.json();
                dispatch(getCurrentTaxAction(result));
                resolve(true);
            } catch (e) {
                console.warn(e);

            }

        })
    }

}