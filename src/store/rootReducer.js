import {combineReducers} from "redux";
import popupReducer from '../component/popup/popupReducer';
import menuReducer from '../component/menu/menuReducer';
import cartReducer from '../component/cart/cartReducer'
const rootReducer = combineReducers({
    popupReducer,
    menuReducer,
    cartReducer
});

export default rootReducer;