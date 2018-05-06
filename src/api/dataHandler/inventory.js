export const product_inventory_data = (item) => {
    let { product = {} } = item;
    let { prices = [] } = item;
    let salesPrice  = prices.find(price => price.name === "default") || {};
    let { categoryId = {name: 'Không có'} } = product;

    return {
        employeeId: item.employeeId,
        companyId: item.companyId,
        importPrice: item.importPrice,
        salesPrice: salesPrice.price || 0,
        product: {
            category: categoryId,
            name: product.name,
            unit: product.unit || '',
            _id: product._id || ''
        },
        quantity: item.quantity || 0
    }
}

export const inventory_history = item => {
    let { products = []} = item;
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
        "totalQuantity": item.totalQuantity || 0,
        "totalPrice": item.totalPrice || 0,
        "dateDelivered": item.dateDelivered || 0,
        "dateReceived": item.dateReceived || 0,
    }
}