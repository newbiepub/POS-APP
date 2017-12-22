import {ROUTE} from "../constant/constant";
import store from "../store/configureStore";

function goToRouteAction(payload) {
    return {
        type: ROUTE.GO_TO_ROUTE,
        payload
    }
}

function openMenuAction() {
    return{
        type:ROUTE.OPEN_MENU
    }
}
function closeMenuAction() {
    return{
        type:ROUTE.CLOSE_MENU
    }
}

function changeRouteMapAction (payload) {
    return {
        type: ROUTE.CHANGE_ROUTE_MAP,
        payload
    }
}

export function openMenu() {
    return store.dispatch(openMenuAction());
}

export function closeMenu() {
    return store.dispatch(closeMenuAction());
}

export function goToRoute(routeId) {
    return store.dispatch(goToRouteAction(routeId));
}

export function changeRouteMap(routeMap) {
    return store.dispatch(changeRouteMapAction(routeMap));
}