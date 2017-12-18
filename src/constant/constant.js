export const ACCOUNT = {
    LOGIN: "LOGIN",
    AUTH: "AUTH",
    LOGOUT: "LOGOUT",
    GET_CURRENT_USER: "GET_CURRENT_USER"
};

// Async Storage
export const ASYNC_STORAGE = {
    USER_LOGGED_IN: "USER_LOGGED_IN",
    AUTH_TOKEN: "AUTH_TOKEN"
};

//popup
export const POPUP = {
    OPEN_POPUP: "OPEN_POPUP",
    CLOSE_POPUP: "CLOSE_POPUP",
    RENDER_POPUP: "RENDER_POPUP"
};

//Main routes
export const ROUTE = {
    GO_TO_ROUTE: "GO_TO_ROUTE",
    OPEN_MENU: "OPEN_MENU",
    CLOSE_MENU:"CLOSE_MENU"
};

//Inventory
export const INVENTORY = {
    GET_INVENTORY_PRODUCT: "GET_INVENTORY_PRODUCT",
    GET_INVENTORY_INGREDIENT: "GET_INVENTORY_INGREDIENT"
};

//product
export const PRODUCT = {
    GET_PRODUCT: "GET_PRODUCT",
    CREATE_PRODUCT: "CREATE_PRODUCT",
    ADD_TO_DISCOUNT: "ADD_TO_DISCOUNT",
    GET_CATEGORY: "GET_CATEGORY",
    GET_DISCOUNT:"GET_DISCOUNT",

};
//transaction
export const TRANSACTION = {
    CREATE_TRANSACTION: "CREATE_ITEM",
    GET_PAYMENT_METHOD:"GET_PAYMENT_METHOD",
    GET_PAYMENT_STATUS:"GET_PAYMENT_STATUS",
    GET_TRANSACTION: "GET_TRANSACTION",
    COUNT_TRANSACTION:"COUNT_TRANSACTION",
    SET_TAX:"SET_TAX",
    COMMIT_PURCHASE:"COMMIT_PURCHASE",
    CLEAN_TRANSACTION:"CLEAN_TRANSACTION",
};
//cart
export const CART = {
    ADD_TO_CART: "ADD_TO_CART",
    CLEAR_CART: "CLEAR_CART",
    REMOVE_CART: "REMOVE_CART",
};