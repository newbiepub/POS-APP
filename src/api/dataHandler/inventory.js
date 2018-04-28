export const product_inventory_data = (item) => {
    let { product = {} } = item;
    return {
        employeeId: item.employeeId,
        companyId: item.companyId,
        product: {
            categoryId: product.categoryId,
            name: product.name,
            price: product.price || [],
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
            "price": product.price || [],
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