import {PRODUCT} from '../constant/constant';
import url from '../config';

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

function getDiscountAction(payload) {
    return {
        type: PRODUCT.GET_DISCOUNT,
        payload
    }
}

export function getProduct(access_token) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let responseProduct = await fetch(`${api}/api/product/getProduct?access_token=${access_token}`);
                responseProduct = await responseProduct.json();
                let responseCategory = await fetch(`${api}/api/category/getCategory?access_token=${access_token}`);
                responseCategory = await responseCategory.json();
                let product = [], variant = [], categoryLength = responseCategory.length;
                responseProduct.forEach(async (item) => {
                    if (item.hasOwnProperty("productVariantParent") === false) {
                        if (item.hasOwnProperty("categoryId")) {
                            for (var i = 0; i < categoryLength; i++) {
                                if (item.categoryId === responseCategory[i]._id) {
                                    item["categoryName"] = responseCategory[i].name;
                                }
                            }
                        }

                        await product.push(item)
                    } else {
                        await variant.push(item)
                    }
                });
                for (let itemProduct of product) {
                    itemProduct["allPrices"] = await [{
                        _id: itemProduct._id,
                        name: itemProduct.name,
                        price: itemProduct.price,
                        unit: itemProduct.unit,

                    }]
                    for (let itemVariant of variant) {
                        if (itemVariant.productVariantParent === itemProduct._id) {
                            await itemProduct["allPrices"].push({
                                _id: itemVariant._id,
                                name: itemVariant.name,
                                price: itemVariant.price,
                                unit: itemVariant.unit,
                            });
                        }

                    }
                }

                dispatch(getCategoryAction(responseCategory));
                dispatch(getProductAction({product, variant}));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function getDiscount(access_token) {
    return async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let result = await fetch(`${api}/api/discount/getDiscount?access_token=${access_token}`);
                result = await result.json();
                dispatch(getDiscountAction(result));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }


        })
    }
}

export function createDiscount(access_token, discount) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {

                let {api} = url;
                let result = await fetch(`${api}/api/discount/createDiscount?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        discount: discount,
                    })
                });
                resolve(result)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}

export function upsertDiscount(access_token, discount) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let result = await fetch(`${api}/api/discount/upsertDiscount?access_token=${access_token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        discount: discount,
                    })
                });

                resolve(result)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}