import {MENU_ACTION} from "../../constant/constant";

function changeRouteAction(payload) {
    return {
        type: MENU_ACTION.CHANGE_ROUTE,
        payload
    }
}

function switchMenuAction(isLoading) {
    return {
        type: MENU_ACTION.SWITCH_MENU,
        payload: isLoading
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

export function switchMenu(isLoading) {
    return async (dispatch, getState) => {
        try {
            dispatch(switchMenuAction(isLoading))

        } catch (e) {
            console.warn(e);
        }
    }
}