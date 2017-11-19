import {ROUTE} from "../constant/constant";

const initialState = {
    currentRoute: "item",
    routeMap: [
        {id: "POS", name: "Điểm bán hàng"},
        {id: "invoice",name: "Hoá đơn"},
        {id: "transaction", name: "Giao dịch"},
        {id: "report", name: "Báo cáo"},
        {id: "item", name: "Mặt hàng"},
        {id: "setting", name: "Cài đặt"},
        {id: "help", name: "Trợ giúp"}
    ]
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
            default: {
                return {
                    ...state
                }
            }
        }
    }
}