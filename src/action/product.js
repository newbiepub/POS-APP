import {PRODUCT} from '../constant/constant';
import url from '../config';

function getProductAction(payload) {
    return {
        type: PRODUCT.GET_PRODUCT,
        payload
    }
}

export function getProduct(access_token) {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {api} = url;
                let response = await fetch(`${api}/api/product/getProduct?access_token=${access_token}`);
                response = await response.json();
                //console.warn(JSON.stringify(response));
                let product = [], variant=[];
                response.forEach( async (item)=>{
                    if(item.hasOwnProperty("productVariantParent") === false)
                    {
                        await product.push(item)
                    }else{
                        await variant.push(item)
                    }
                });
                dispatch(getProductAction({product, variant}));
                resolve(true)
            } catch (e) {
                console.warn(e);
                reject(false)
            }

        })
    }
}