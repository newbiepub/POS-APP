import moment from "moment";
import 'moment/locale/vi';
moment.locale('vi');
/**
 * Moment
 */

export function formatDate(date) {
    return moment(date).format('dddd DD-MM-YYYY [lúc] h:mm a');
}

export const uuid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const equals = (a, b) => {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (a.prototype !== b.prototype) return false;
    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every(k => equals(a[k], b[k]));
};

export const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const pull = (arr, ...args) => {
    let argState = Array.isArray(args[0]) ? args[0] : args;
    let pulled = arr.filter((v, i) => !argState.includes(v));
    arr.length = 0;
    pulled.forEach(v => arr.push(v));
};

/**
 * Object Value
 */

const convertStringToFields = (target, fields , index = 0) => {
    let obj = target[fields[index]];
    if(!obj) return target;
    else return convertStringToFields(obj, fields, ++index);
}

export const objectValue = (target, fields) => {
    fields = fields.split('.');

    return convertStringToFields(target, fields);
}