
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
                priceImport: items.priceImport,
                totalPrice: items.totalPrice,
                unit: items.unit,
            };
        } else {
            newItem = {
                productId: items._id,
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: getPriceInput(items.price),
                priceImport: items.priceImport,
                category: items.category || null,
                totalPrice: items.totalPrice,
                unit: items.unit,
                discounts: items.discounts || null
            };
        }
        result.push(newItem)
    }
    return result
}

export function normalizeProductItemsIssueRefund(data) {
    let result = [];
    for (items of data) {
        let newItem;
        if (items.hasOwnProperty("customAmount")) {
            newItem = {
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: getPriceInput(items.price),
                totalPrice: items.totalPrice,
                priceImport: items.priceImport,
                unit: items.unit,
                discounts: items.discounts || null
            };
        } else {
            newItem = {
                productId: items.productId,
                productName: items.name || items.productName,
                quantity: items.quantity,
                price: getPriceInput(items.price),
                totalPrice: items.totalPrice,
                priceImport: items.priceImport,
                category: items.category||null,
                unit: items.unit,
                discounts: items.discounts || null
            };
        }

        result.push(newItem)
    }
    return result
}

function getPriceInput(price) {
    const result = Object.assign({}, price);
    delete result._id;
    // console.warn(result)
    return result
}

export function normalizeTransactionSectionList(data) {
    try {
        let result = [];
        for (var i = 0; i < data.length; i++) {
            try {
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
            } catch (e) {
                console.warn("e-normalizeTransactionSectionList-" + e)
            }

        }
        return result
    } catch (e) {
        console.warn("e-normalizeTransactionSectionList-" + e);
        return []
    }

}