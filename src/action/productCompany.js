import {ASYNC_STORAGE, PRODUCT} from '../constant/constant';
import url from '../config';
import { AsyncStorage } from 'react-native';

function getProductAction(payload) {
    return {
        type: PRODUCT.GET_PRODUCT,
        payload
    }
}

function getCategoryAction(payload) {
    return {
        type: PRODUCT.GET_CATEGORY,
        payload
    }
}

function getDiscountAction(payload) {
    return {
        type: PRODUCT.GET_DISCOUNT,
        payload
    }
}

export function getProduct() {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await AsyncStorage.getItem(ASYNC_STORAGE.COMPANY_AUTH);
                token = JSON.parse(token);
                let {api} = url;
                let responseProduct = await fetch(`${api}/company/api/product/getProduct?access_token=${token.access_token}`);
                responseProduct = await responseProduct.json();
                let responseCategory = await fetch(`${api}/company/api/category/getCategory?access_token=${token.access_token}`);
                responseCategory = await responseCategory.json();
                dispatch(getCategoryAction(responseCategory));
                dispatch(getProductAction(responseProduct));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }
        })
    }
}

export function getDiscount(access_token) {
    return async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let result = await fetch(`${api}/api/discount/getDiscount?access_token=${access_token}`);
                result = await result.json();
                dispatch(getDiscountAction(result));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }


        })
    }
}

export function createDiscount(access_token, discount) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                let {api} = url;
                let result = await fetch(`${api}/api/discount/createDiscount?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        discount: discount,
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

export function upsertDiscount(access_token, discount) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let result = await fetch(`${api}/api/discount/upsertDiscount?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        discount: discount,
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