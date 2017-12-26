import {combineReducers} from 'redux';
import account from "./account";
import popup from "./popup";
import route from "./route";
import product from "./product";
import transaction from "./transaction";
import cart from './cart';
import inventory from "./inventory";
import accountCompany from "./accountCompany";
import routeCompany from "./routeCompany";
import invoice from "./invoice";
import employeeCompany from "./employeeCompany";
import tax from './tax';
import inventoryActivity from "./inventoryActivity";
const appReducers = combineReducers({
    account,
    popup,
    route,
    product,
    transaction,
    cart,
    tax,
    inventory,
    accountCompany,
    routeCompany,
    invoice,
    employeeCompany,
    inventoryActivity
});

export default appReducers;