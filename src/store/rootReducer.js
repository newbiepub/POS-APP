import {combineReducers} from "redux";
import popup from "../component/popup/reducer/popup";
import {listProduct} from "../reducer/product";
import auth from "../reducer/auth";
import pos from "../reducer/pos";
import inventory from "../reducer/inventory";
import discount from "../reducer/discount";
import category from "../reducer/category";

const rootReducer = combineReducers({
    popup,
    auth,
    pos,
    category,
    inventory,
    listProduct,
    discount
});

export default rootReducer;