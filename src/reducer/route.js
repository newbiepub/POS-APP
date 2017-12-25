import {ACCOUNT, ROUTE} from "../constant/constant";

const initialState = {
    currentRoute: "POS",
    routeMap: [
        {id: "POS", name: "Điểm bán hàng"},
        {id: "invoice",name: "Hoá đơn"},
        {id: "transaction", name: "Giao dịch"},
        {id: "report", name: "Báo cáo"},
        {id: "item", name: "Mặt hàng"},
        {id: "inventory", name: "Kho hàng"},
        {id: "setting", name: "Cài đặt"},
      /*  {id: "help", name: "Trợ giúp"}*/
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
            case ACCOUNT.LOGOUT:
                return initialState;
            default: {
                return {
                    ...state
                }
            }
        }
    }
}