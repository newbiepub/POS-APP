import {ASYNC_STORAGE, TAX} from '../constant/constant';
import url from '../config';
import {AsyncStorage} from 'react-native';

function getTaxHistoryAction(payload) {
    return {
        type: TAX.GET_TAX_HISTORY,
        payload
    }
}


function getCurrentTaxAction(payload) {
    return {
        type: TAX.GET_CURRENT_TAX,
        payload
    }
}

export function createTax(tax) {
    return new Promise(async (resolve, reject) => {
        try {
            let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
            token = JSON.parse(token);
            let {api} = url;
            let result = await fetch(`${api}/company/api/tax/createTax?access_token=${token.access_token}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tax,
                })
            });
            result = await result.json()
            if(result.hasOwnProperty("error"))
            {
                reject(result.error.message)
            }
            resolve(true)
        } catch (e) {
            console.warn(e);

        }

    })
}
export function getTaxHistory() {
    return (dispatch)=>{
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
                token = JSON.parse(token);
                let {api} = url;
                let result = await fetch(`${api}/company/api/tax/getTaxHistory?access_token=${token.access_token}`);
                result = await result.json();
                dispatch(getTaxHistoryAction(result));
                resolve(true);
            } catch (e) {
                console.warn(e);

            }

        })
    }

}
export function getCurrentTax() {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
                token = JSON.parse(token);
                let {api} = url;
                let result = await fetch(`${api}/company/api/tax/currentTax?access_token=${token.access_token}`);
                result = await result.json();
                dispatch(getCurrentTaxAction(result));
                resolve(true);
            } catch (e) {
                console.warn(e);

            }

        })
    }

}