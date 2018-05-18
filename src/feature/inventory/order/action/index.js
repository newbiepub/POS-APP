
import {fetchInventoryActivity} from "../request/action/fetch";
import {approveOrder} from "../product/action/approve";

const INVENTORY_ACTIVITY = {
    FETCH_INVENTORY_ACTIVITY_COMPANY: fetchInventoryActivity,
    APPROVE_ORDER: approveOrder
}

export default INVENTORY_ACTIVITY;