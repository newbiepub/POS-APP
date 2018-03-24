import {removeTypeName} from './function';
import moment from '../../component/moment';

export function normalizeProductItemsInput(data) {
    let result = [];
    for (items of data) {
        let newItem;
        if (items.hasOwnProperty("customAmount")) {
            newItem = {
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: getPriceInput(items.price),
                totalPrice: items.totalPrice,
                unit: items.unit,
                discount: items.discount || null
            };
        } else {
            newItem = {
                productId: items._id,
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: getPriceInput(items.price),
                totalPrice: items.totalPrice,
                unit: items.unit,
                discount: items.discount || null
            };
        }

        newItem.price.currency = removeTypeName(newItem.price.currency);
        result.push(newItem)
    }
    return result
}

function getPriceInput(price){
    const result =  Object.assign({}, removeTypeName(price));
    delete result._id;
    // console.warn(result)
    return result
}

export function normalizeTransactionSectionList(data) {
    try{
        let result = [];
        for (var i = 0; i < data.length; i++) {
            try{
                if (result.length === 0) {
                    result.push({title: data[i].createdAt, data: [data[i]]});
                } else {
                    for (var j = 0; j < result.length; j++) {

                        if (moment(data[i].createdAt).format("DD/MM/YYYY") === moment(result[j].title).format("DD/MM/YYYY")) {
                            result[j].data.push(data[i]);

                            break;
                        } else {
                            if (j === result.length - 1) {
                                result.push({title: data[i].createdAt, data: [data[i]]});
                                break;
                            }
                        }
                    }
                }
            }catch(e)
            {
                console.warn("e-normalizeTransactionSectionList-" + e)
            }

        }
        return result
    }catch(e)
    {
        console.warn("e-normalizeTransactionSectionList-" + e)
        return []
    }

}