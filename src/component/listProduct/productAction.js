import {PRODUCT} from "../../constant/constant";
import {QUERY} from '../../constant/query';
import {omitDeep} from "../../reuseable/function/function";
import {client} from '../../root';

function getProductAction(payload) {
    return {
        type: PRODUCT.GET_PRODUCT,
        payload
    }
}

function getCategoryAction(payload) {
    return {
        type: PRODUCT.GET_CATEGORY,
        payload
    }
}

function getProductAmountAction(payload) {
    return {
        type: PRODUCT.GET_PRODUCT_AMOUNT,
        payload
    }
}


function getPaymentMethodAction(payload) {
    return {
        type: PRODUCT.GET_PAYMENT_METHOD,
        payload
    }
}

function getPaymentStatusAction(payload) {
    return {
        type: PRODUCT.GET_PAYMENT_STATUS,
        payload
    }
}

function subtractInventoryLocalAction(payload) {
    return {
        type: PRODUCT.SUBTRACT_PRODUCT_INVENTORY,
        payload
    }
}

function returnInventoryLocalAction(payload) {
    return {
        type: PRODUCT.RETURN_PRODUCT_INVENTORY,
        payload
    }
}

function switchCategoryViewAction() {
    return {
        type: PRODUCT.SWITCH_CATEGORY_VIEW
    }
}

function getDiscountEmployeeAction(payload) {
    return {
        type: PRODUCT.GET_DISCOUNT_EMPLOYEE,
        payload
    }

}

export function getProduct(userId, limit, skip) {
    return async (dispatch, getState) => {
        try {
            const products = await client.query({
                query: QUERY.INVENTORY_PRODUCT,
                variables: {
                    userId,
                    limit,
                    skip
                },
                fetchPolicy: "network-only"
            });
            dispatch(getProductAction(products.data.getUserProductInventory));

        } catch (e) {
            console.warn("productAction.js-getProduct-" + e);
        }
    }
}

export function getProductAmount(userId) {

    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const productAmount = await client.query({
                    query: QUERY.GET_AMOUNT_INVENTORY_PRODUCT,
                    variables: {
                        userId,
                    },
                    fetchPolicy: "network-only"
                });

                dispatch(getProductAmountAction(productAmount.data.getAmountUserProductInventory.inventoryAmount));
                resolve(productAmount.data.getAmountUserProductInventory.inventoryAmount);
            } catch (e) {
                console.warn("productAction.js-getProductAmount-" + e);
                reject(null)
            }
        })
    }
}

export function getCategory() {
    return async (dispatch, getState) => {
        try {
            const category = await client.query({
                query: QUERY.CATEGORIES,
                fetchPolicy: "network-only"
            });
            // console.warn(category)
            dispatch(getCategoryAction(category.data.categories));

        } catch (e) {
            console.warn("productAction.js-getCategory-" + e);
        }
    }

}

export function getDiscountEmployee() {

    return async (dispatch, getState) => {

        try {
            const discount = await client.query({
                query: QUERY.GET_DISCOUNT_EMPLOYEE,
                fetchPolicy: "network-only"
            });
            dispatch(getDiscountEmployeeAction(omitDeep(discount.data.GET_DISCOUNT_EMPLOYEE, '__typename')))
        } catch (e) {
            console.warn("productAction.js-getDiscountEmployee-" + e);
        }
    }
}

export function getPaymentMethod() {

    return async (dispatch, getState) => {

        try {
            const paymentMethod = await client.query({
                query: QUERY.PAYMENT_METHOD,
                fetchPolicy: "network-only"
            });
            dispatch(getPaymentMethodAction(paymentMethod.data.paymentMethod));
        } catch (e) {
            console.warn("productAction.js-getPaymentMethod-" + e);
        }
    }
}

export function getPaymentStatus() {

    return async (dispatch, getState) => {

        try {
            const paymentStatus = await client.query({
                query: QUERY.PAYMENT_STATUS,
                fetchPolicy: "network-only"
            });
            dispatch(getPaymentStatusAction(paymentStatus.data.paymentStatus));
        } catch (e) {
            console.warn("productAction.js-getPaymentMethod-" + e);
        }
    }
}

export function subtractInventoryLocal(productItems) {

    return async (dispatch, getState) => {

        try {
            dispatch(subtractInventoryLocalAction(productItems))
        } catch (e) {
            console.warn("productAction.js-subtractInventoryLocal-" + e);
        }
    }
}

export function returnInventoryLocal(productItems) {

    return async (dispatch, getState) => {

        try {
            dispatch(returnInventoryLocalAction(productItems))
        } catch (e) {
            console.warn("productAction.js-returnInventoryLocal-" + e);
        }
    }
}

export function switchCategoryView() {
    return async (dispatch, getState) => {

        try {
            dispatch(switchCategoryViewAction())
        } catch (e) {
            console.warn("productAction.js-switchCategoryView-" + e);
        }
    }
}