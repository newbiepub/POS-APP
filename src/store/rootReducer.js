import {combineReducers} from "redux";
import popup from "../component/popup/reducer/popup";
import {listProduct} from "../reducer/product";
import auth from "../reducer/auth";
import pos from "../reducer/pos";
import inventory from "../reducer/inventory";
import discount from "../reducer/discount";

const rootReducer = combineReducers({
    popup,
    auth,
    pos,
    inventory,
    listProduct,
    discount
});

export default rootReducer;