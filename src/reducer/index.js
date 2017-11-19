import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";
import item from "./item";

const appReducers = combineReducers({
    account,
    popup,
    route,
    item
});

export default appReducers;