import {USER} from "../../constant/constant";

import {QUERY} from '../../constant/query';

import {client} from '../../root';

function getUserProfileAction(payload) {
    return {
        type: USER.GET_PROFILE_USER,
        payload
    }
}
function getCurrencyAction(payload) {
    return {
        type: USER.GET_CURRENCY,
        payload
    }
}
function logoutAction() {
    return {
        type: USER.LOG_OUT,
    }
}
export function getProfile() {
    return async (dispatch, getState) => {
        try {
            const profile = await client.query({
                query: QUERY.CURRENT_USER,
                fetchPolicy: "network-only"
            });
            dispatch(getUserProfileAction(profile.data.currentUser))

        } catch (e) {
            console.warn("userAction.js-getProfile-"+e);
        }
    }
}
export function getCurrency(){
    return async (dispatch, getState) => {
        try {
            const currency = await client.query({
                query: QUERY.CURRENCY,
                fetchPolicy: "network-only"
            });
            // console.warn(currency)
            dispatch(getCurrencyAction(currency.data.currency[0]))

        } catch (e) {
            console.warn("userAction.js-getCurrency-"+e);
        }
    }
}
export function logout(){
    return async (dispatch, getState) => {
        try {
            dispatch(logoutAction())

        } catch (e) {
            console.warn("userAction.js-logout-"+e);
        }
    }
}