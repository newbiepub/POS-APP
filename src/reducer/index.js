import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";
import product from "./product";
import transaction from "./transaction";

const appReducers = combineReducers({
    account,
    popup,
    route,
    product,
    transaction
});

export default appReducers;