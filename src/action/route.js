import {ROUTE} from "../constant/constant";
import store from "../store/configureStore";

function goToRouteAction(payload) {
    return {
        type: ROUTE.GO_TO_ROUTE,
        payload
    }
}

export function goToRoute (routeId) {
    return store.dispatch(goToRouteAction(routeId));
}