export const ASYNC_STORAGE = {
    AUTH_TOKEN: "AUTH_TOKEN",
};

export const MENU_ACTION = {
    CHANGE_ROUTE: "CHANGE_ROUTE",
    SWITCH_MENU: "SWITCH_MENU"
};
export const POPUP_ACTION = {
    OPEN_POPUP: "OPEN_POPUP",
    CLOSE_POPUP: "CLOSE_POPUP"
};
export const CART_ACTION = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAN_CART: "CLEAN_CART"
};
export const USER = {
    GET_PROFILE_USER: "GET_PROFILE_USER",
    GET_CURRENCY: "GET_CURRENCY",
    LOG_OUT: "LOG_OUT"
};

export const PRODUCT = {
    GET_PRODUCT: 'GET_PRODUCT',
    GET_PRODUCT_AMOUNT: 'GET_PRODUCT_AMOUNT',
    GET_PAYMENT_METHOD: "GET_PAYMENT_METHOD",
    GET_PAYMENT_STATUS: "GET_PAYMENT_STATUS",
    SUBTRACT_PRODUCT_INVENTORY: "SUBTRACT_PRODUCT_INVENTORY",
    RETURN_PRODUCT_INVENTORY:'RETURN_PRODUCT_INVENTORY',
    SWITCH_CATEGORY_VIEW: 'SWITCH_CATEGORY_VIEW'
};
export const TRANSACTION = {
    GET_TRANSACTION: "GET_TRANSACTION",
    GET_TRANSACTION_AMOUNT: "GET_TRANSACTION_AMOUNT",
    CREATE_TRANSACTION: "CREATE_TRANSACTION",
    UPDATE_TRANSACTION:"UPDATE_TRANSACTION",
    ASYNC_CREATE_TRANSACTION: "ASYNC_CREATE_TRANSACTION",
    ASYNC_ISSUE_REFUND: "ASYNC_ISSUE_REFUND",
    ASYNC_UPDATE_TRANSACTION:"ASYNC_UPDATE_TRANSACTION",
    ADJUST_TRANSACTION_NOT_CREATED: "ADJUST_TRANSACTION_NOT_CREATED",
    REMOVE_TRANSACTION_ASYNC_LOCAL: "REMOVE_TRANSACTION_ASYNC_LOCAL",
    REMOVE_ISSUE_REFUND_ASYNC_LOCAL: "REMOVE_ISSUE_REFUND_ASYNC_LOCAL",
    REMOVE_UPDATE_TRANSACTION_ASYNC_LOCAL: 'REMOVE_UPDATE_TRANSACTION_ASYNC_LOCAL',
    ADJUST_TRANSACTION: "ADJUST_TRANSACTION",
    SELECT_TRANSACTION: "SELECT_TRANSACTION"
};