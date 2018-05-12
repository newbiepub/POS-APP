export const activity_logger = (data) => {
    return {
        message: data.message || '',
        data: data.data || '',
        type: data.type || '',
        createdAt: data.createdAt || ''
    }
}