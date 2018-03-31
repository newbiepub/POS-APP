import {MENU_ACTION} from '../../constant/constant';

const initialState = {
    menuItems: [{id: 'pos', name: 'Điểm bán hàng'},
        {id: 'report', name: 'Thống kê',disable:true},
        {id: 'transaction', name: 'Giao dịch'},
        {id: 'invoice', name: 'Hoá đơn',disable:true},
        {id: 'inventory', name: 'Kho',disable:true},
        {id: 'setting', name: 'Cài đặt'},],
    isLoading: false,
    menuVisible: false
};
initialState.currentItem = initialState.menuItems[0];
export default function (state = initialState, action = {}) {
    switch (action.type) {

        case MENU_ACTION.CHANGE_ROUTE: {
            return {
                ...state,
                currentItem: action.payload,
                isLoading:false
            }
        }

        case MENU_ACTION.SWITCH_MENU: {
            return {
                ...state,
                menuVisible: !state.menuVisible,
                isLoading: action.payload
            }
        }
        default:
            return {
                ...state
            };
    }
}