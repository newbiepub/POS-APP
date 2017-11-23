import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";
import product from "./product";

const appReducers = combineReducers({
    account,
    popup,
    route,
    product
});

export default appReducers;