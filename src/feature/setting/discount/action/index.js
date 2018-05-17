import {fetchDiscount} from "./fetchDiscount";
import {creatDiscount} from "./createDiscount";
import {updateDiscount} from "./updateDiscount";

const DISCOUNT = {
    FETCH_ALL_DISCOUNT: fetchDiscount,
    CREATE_DISCOUNT: creatDiscount,
    UPDATE_DISCOUNT: updateDiscount
}

export default DISCOUNT;