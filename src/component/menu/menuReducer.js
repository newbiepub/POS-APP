import {MENU_ACTION} from '../../constant/constant';

const initialState = {
    menuItems: [{id: 'pos', name: 'Điểm bán hàng'},
        {id: 'report', name: 'Thống kê'},
        {id: 'transaction', name: 'Giao dịch'},
        {id: 'invoice', name: 'Hoá đơn'},
        {id: 'inventory', name: 'Kho'},
        {id: 'setting', name: 'Cài đặt'},],
    currentItem: {id: 'pos', name: 'Điểm bán hàng'},
    menuVisible: false
};

export default function (state = initialState, action = {}) {
    switch (action.type) {

        case MENU_ACTION.CHANGE_ROUTE: {
            return {
                ...state,
                currentItem: action.payload
            }
        }

        case MENU_ACTION.SWITCH_MENU: {
            return {
                ...state,
                menuVisible: !state.menuVisible
            }
        }
        default:
            return {
                ...state
            };
    }
}