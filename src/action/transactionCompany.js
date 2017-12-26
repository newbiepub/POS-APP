import {TRANSACTION, ASYNC_STORAGE} from '../constant/constant';
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

export function getTransaction(limit, skip) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
                token = JSON.parse(token);
                let {api} = url;
                let transaction = await fetch(`${api}/company/api/transaction/getTransaction?access_token=${token.access_token}&limit=${limit}&skip=${skip}`);
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

export function countTransaction() {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
                token = JSON.parse(token);
                let {api} = url;
                let transactionNumber = await fetch(`${api}/company/api/transaction/countTransaction?access_token=${token.access_token}`);
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
