import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";

const appReducers = combineReducers({
    account,
    popup,
    route
});

export default appReducers;