import {ACCOUNT_COMPANY, ROUTE} from "../constant/constant";

const initialState = {
    currentRoute: "POS",
    routeMap: [
        {id: "POS", name: "Điểm bán hàng"},
        {id: "item", name: "Mặt hàng"},
        {id: "report",name: "Thống kê"},
        {id: "inventory",name: "Kho hàng"},
        {id: "inventoryActivity",name: "QL xuất nhập kho"},
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
            case ACCOUNT_COMPANY.LOGOUT: {
                return initialState;
            }
            default: {
                return state
            }
        }
    }
}