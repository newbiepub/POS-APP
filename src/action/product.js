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

export function getProduct(access_token) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                if(access_token == undefined) {
                    let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
                    access_token = token.access_token;
                }

                let {api} = url;
                let responseProduct = await fetch(`${api}/api/product/getProduct?access_token=${access_token}`);
                responseProduct = await responseProduct.json();
                let responseCategory = await fetch(`${api}/api/category/getCategory?access_token=${access_token}`);
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
                if(access_token == undefined) {
                    let token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
                    access_token = token.access_token;
                }
                console.warn(access_token)
                let result = await fetch(`${api}/api/discount/getDiscount?access_token=${access_token}`);
                result = await result.json();
                console.warn(JSON.stringify(result));
                dispatch(getDiscountAction(result));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }


        })
    }
}
