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
                price: removeTypeName(items.price),
                totalPrice: items.totalPrice,
                unit: items.unit,
                discount: items.discount || null
            };
        } else {
            newItem = {
                _id: items._id,
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: removeTypeName(items.price),
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

export function normalizeTransactionSectionList(data) {
    let result = [];
    for (var i = 0; i < data.length; i++) {
        if (result.length === 0) {
            result.push({title: data[i].date, data: [data[i]]});
        } else {
            for (var j = 0; j < result.length; j++) {

                if (moment(data[i].date).format("DD/MM/YYYY") === moment(result[j].title).format("DD/MM/YYYY")) {
                    result[j].data.push(data[i]);
                    break;
                } else {
                    if (j === result.length - 1) {
                        result.push({title: data[i].date, data: [data[i]]});
                        break;
                    }
                }
            }
        }
    }
    return result
}