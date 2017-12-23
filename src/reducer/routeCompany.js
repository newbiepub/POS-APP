import {ROUTE} from "../constant/constant";

const initialState = {
    currentRoute: "POS",
    routeMap: [
        {id: "POS", name: "Điểm bán hàng"},
        {id: "report",name: "Thống kê"},
        {id: "setting",name: "Cài Đặt"}
    ],
    menuVisible: false
};

export default routeReducer(initialState);

function routeReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case ROUTE.GO_TO_ROUTE: {
                return {
                    ...state,
                    currentRoute: action.payload
                }
            }
            case ROUTE.OPEN_MENU: {
                return {
                    ...state,
                    menuVisible: true
                }
            }
            case ROUTE.CLOSE_MENU: {
                return {
                    ...state,
                    menuVisible: false
                }
            }
            case ROUTE.CHANGE_ROUTE_MAP: {
                return {
                    ...state,
                    routeMap: action.payload
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}