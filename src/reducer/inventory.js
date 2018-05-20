import {INVENTORY_ACTION, INVENTORY_ACTIVITY_ACTION} from "../constant/actionTypes";

const initialState = {
    products: [],
    history: [],
    activity: [],
    activityRequest: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY_ACTION.FETCH_USER_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
        case INVENTORY_ACTION.UPDATE_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
        case INVENTORY_ACTION.FETCH_INVENTORY_HISTORY: {
            return {
                ...state,
                history: action.payload
            }
        }
        case INVENTORY_ACTIVITY_ACTION.FETCH_LOGS: {
            return {
                ...state,
                activity: action.payload
            }
        }
        case INVENTORY_ACTIVITY_ACTION.FETCH_INVENTORY_ACTIVITY_COMPANY: {
            return {
                ...state,
                activityRequest: action.payload
            }
        }
        default: return state
    }
}