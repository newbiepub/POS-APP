import {combineReducers} from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";
import product from "./product";
import transaction from "./transaction";
import cart from './cart';
import inventory from "./inventory";

const appReducers = combineReducers({
    account,
    popup,
    route,
    product,
    transaction,
    cart,
    inventory
});

export default appReducers;