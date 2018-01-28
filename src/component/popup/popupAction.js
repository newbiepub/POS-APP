import {POPUP_ACTION} from "../../constant/constant";

function openPopupAction(payload) {
    return {
        type: POPUP_ACTION.OPEN_POPUP,
        payload
    }
}

function closePopupAction() {
    return {
        type: POPUP_ACTION.CLOSE_POPUP,
    }
}

export function openPopup(content) {
    return async (dispatch, getState) => {
        try {
            dispatch(openPopupAction(content))

        } catch (e) {
            console.warn(e);
        }
    }
}

export function closePopup() {
    return async (dispatch, getState) => {
        try {
            dispatch(closePopupAction())

        } catch (e) {
            console.warn(e);
        }
    }
}