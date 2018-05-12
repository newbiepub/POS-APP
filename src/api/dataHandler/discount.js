export const discount_data = (data) => {
    return {
        "products": data.products || [],
        "companyId": data.companyId || '',
        "employeeIds": data.employeeIds || [],
        "name": data.name || '',
        "description": data.description || '',
        "type": data.type || '',
        "value": data.value || '',
        "appliedDate": data.appliedDate || '',
        "dueDate": data.dueDate || '',
        "createdAt": data.createdAt || ''
    }
}