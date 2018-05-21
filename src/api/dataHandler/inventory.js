export const product_inventory_data = (item) => {
    let { product = {} } = item;
    let { prices = [] } = item;
    let salesPrice  = prices.find(price => price.name === "default") || {};
    let { categoryId = {name: 'Không có'} } = product;

    return {
        _id: item._id || '',
        employeeId: item.employeeId,
        companyId: item.companyId,
        importPrice: item.importPrice,
        salesPrice: salesPrice.price || 0,
        product: {
            category: categoryId,
            name: product.name,
            unit: product.unit || '',
            _id: product._id || '',
            productCode: product.productCode || ''
        },
        quantity: item.quantity || 0
    }
}

export const inventory_order_data = item => {
    let { products = [], from = {}, to = {} } = item;

    products = products.map(product => {
        return {
            "_id": product._id || '',
            "name": product.name || '',
            "quantity": product.quantity || 0,
            "salePrice": product.salePrice || 0
        }
    })
    return {
        "_id": item._id,
        "products": products,
        "totalPrice": item.totalPrice || 0,
        "from": {
            "_id": from._id
        },
        "to": {
            "_id": to._id,
            "name": to.name || '',
            "phone": to.phone || '',
            "email": to.email || '',
            "address": to.address || ''
        },
        "totalQuantity": item.totalQuantity || 0,
        "dateRequest": item.dateRequest
    }
}

export const inventory_history = item => {
    let { products = [], from = {}, to = {}} = item;
    products = products.map(product => {
        return {
            "_id": product._id || '',
            "name": product.name || '',
            "prices": product.prices || [{name: 'default', price: 0}],
            "importPrice": product.importPrice || 0,
            "quantity": product.quantity || 0,
            "unit": product.unit || '',
            "productCode": product.productCode || ''
        }
    })
    return {
        _id: item._id || '',
        products,
        type: item.type || '',
        from: {
            name: from.name || ''
        },
        to: {
            name: to.name || ''
        },
        "totalQuantity": item.totalQuantity || 0,
        "totalPrice": item.totalPrice || 0,
        "dateDelivered": item.dateDelivered || 0,
        "dateReceived": item.dateReceived || 0,
    }
}