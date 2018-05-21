import {MENU_ACTION, USER} from '../../constant/constant';

const initialState = {
    menuItems: [{id: 'pos', name: 'Điểm bán hàng'},
        {id: 'report', name: 'Thống kê'},
        {id: 'transaction', name: 'Giao dịch'},
        {id: 'invoice', name: 'Hoá đơn',disable:true},
        {id: 'inventory', name: 'Kho'},
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
        case USER.LOG_OUT :{
            return {
                menuItems: [{id: 'pos', name: 'Điểm bán hàng'},
                    {id: 'report', name: 'Thống kê'},
                    {id: 'transaction', name: 'Giao dịch'},
                    {id: 'invoice', name: 'Hoá đơn',disable:true},
                    {id: 'inventory', name: 'Kho'},
                    {id: 'setting', name: 'Cài đặt'},],
                isLoading: false,
                currentItem:{id: 'pos', name: 'Điểm bán hàng'},
                menuVisible: false
            }
        }
        default:
            return {
                ...state
            };
    }
}