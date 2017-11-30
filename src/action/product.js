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