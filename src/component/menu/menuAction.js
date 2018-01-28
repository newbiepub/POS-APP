import {MENU_ACTION} from "../../constant/constant";

function changeRouteAction(payload) {
    return {
        type: MENU_ACTION.CHANGE_ROUTE,
        payload
    }
}

function switchMenuAction() {
    return {
        type: MENU_ACTION.SWITCH_MENU,
    }
}

export function changeRoute(route) {
    return async (dispatch, getState) => {
        try {
            dispatch(changeRouteAction(route))

        } catch (e) {
            console.warn(e);
        }
    }
}

export function switchMenu() {
    return async (dispatch, getState) => {
        try {
            dispatch(switchMenuAction())

        } catch (e) {
            console.warn(e);
        }
    }
}