export function numberwithThousandsSeparator(x) {
    try {
        let parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    } catch (e) {
        console.warn(e);
        return x;
    }
}

export function removeTypeName(data) {
    const result = Object.assign({}, data);
    delete result.__typename;
    return result
}

function omitDeepArrayWalk(arr, key) {
    return arr.map((val) => {
        if (Array.isArray(val)) return omitDeepArrayWalk(val, key)
        else if (typeof val === 'object') return omitDeep(val, key)
        return val
    })
}

export function omitDeep(obj, key) {
    if (Array.isArray(obj)) return omitDeepArrayWalk(obj, key)
    const keys = Object.keys(obj)
    const newObj = {}
    keys.forEach((i) => {
        if (i !== key) {
            const val = obj[i]
            if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key)
            else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key)
            else newObj[i] = val
        }
    })
    return newObj
}