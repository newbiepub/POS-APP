import {combineReducers} from "redux";
import popupReducer from '../component/popup/popupReducer';
import menuReducer from '../component/menu/menuReducer';
import cartReducer from '../component/cart/cartReducer';
import productReducer from '../component/listProduct/productReducer';
import userReducer from '../feature/login/userReducer';
import transactionReducer from '../feature/transaction/transactionReducer';
const rootReducer = combineReducers({
    popupReducer,
    menuReducer,
    cartReducer,
    productReducer,
    userReducer,
    transactionReducer
});

export default rootReducer;