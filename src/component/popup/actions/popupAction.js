import store from "../../../store/store";
import {POPUP_ACTION} from "../../../constant/popup";

export function openPopup() {
    return store.dispatch({type: POPUP_ACTION.OPEN})
}

export function closePopup() {
    return store.dispatch({type: POPUP_ACTION.CLOSE})
}

export function renderContent(content) {
    return store.dispatch({type: POPUP_ACTION.RENDER_CONTENT, payload: content});
}