import {POPUP} from "../constant/constant";
import store from "../store/configureStore";

function openPopupAction(payload) {
    return {
        type: POPUP.OPEN_POPUP,
        payload
    }
}

function closePopupAction (payload) {
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
    try {
        store.dispatch(openPopupAction({visible: true}))
    } catch(e) {
        throw e;
    }
}

export function closePopup() {
    try {
        store.dispatch(closePopupAction({visible: false}))
    } catch(e) {
        throw e;
    }
}

export function renderPopup(element) {
    try {
        store.dispatch(renderPopupAction(element));
    } catch(e) {
        throw e;
    }
}