import {POPUP} from "../constant/constant";
import store from "../store/configureStore";

function openPopupAction(payload) {
    return {
        type: POPUP.OPEN_POPUP,
        payload
    }
}

function closePopupAction(payload) {
    return {
        type: POPUP.CLOSE_POPUP,
        payload
    }
}

function renderPopupAction(payload) {
    return {
        type: POPUP.RENDER_POPUP,
        payload
    }
}

export function openPopup() {

    return async (dispatch, getState) => {
        try {
            dispatch(openPopupAction(true))
        } catch(e) {
            console.warn(e);
        }
    }
}

export function closePopup() {

    return async (dispatch, getState) => {
        try {
            dispatch(closePopupAction(false))
        } catch(e) {
            console.warn(e);
        }
    }
}

export function renderPopup(element) {
    return async (dispatch, getState) => {
        try {
            dispatch(renderPopupAction(element))
        } catch(e) {
            console.warn(e);
        }
    }
}