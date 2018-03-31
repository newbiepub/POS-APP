import moment from "moment";
import 'moment/locale/vi';
moment.locale('vi');
/**
 * Moment
 */

export function formatDate(date) {
    return moment(date).format('dddd DD-MM-YYYY [lúc] h:mm a');
}