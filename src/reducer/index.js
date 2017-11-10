import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";

const appReducers = combineReducers({
    account,
    popup
});

export default appReducers;