export const pos_data = (item) => {
    let { profile = {} } = item;
    return {
        _id: item._id || '',
        companyId: item.companyId || null,
        profile: {
            address: profile.address || '',
            name: profile.name || '',
            phoneNumber: profile.phoneNumber || '',
        },
        username: item.username || '',
        status: item.status || ''
    }
}