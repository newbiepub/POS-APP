import {INVENTORY, USER} from '../../constant/constant';
import {REHYDRATE} from 'redux-persist';
import {omitDeep} from "../../reuseable/function/function";

const initialState = {
    inventoryActivityAmount: 0,
    inventoryActivity: [],
    inventoryActivitySelected:{}
};
function updateInventory(state, inventory) {
    if (state.length === 0) {
        return inventory
    } else {
        for (let i = 0; i < inventory.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (inventory[i]._id === state[j]._id) {
                    state.splice(j, 1);
                    state.splice(j, 0, inventory[i]);
                    break;
                } else {
                    if (j === state.length - 1) {

                        state.push(inventory[i])
                    }
                }
            }

        }
    }
    state.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return state

}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case INVENTORY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE_AMOUNT: {
            return {
                ...state,
                inventoryActivityAmount: action.payload
            }
        }
        case INVENTORY.FETCH_INVENTORY_ACTIVITY_EMPLOYEE: {
            let newInventory = updateInventory(state.inventoryActivity, action.payload);
            return {
                ...state,
                inventoryActivity: [...newInventory]
            }
        }
        case INVENTORY.SELECT_INVENTORY_ACTIVITY: {
            return {
                ...state,
                inventoryActivitySelected: action.payload
            }
        }
        case REHYDRATE: {
            if (action.payload && action.payload.inventoryReducer) {

                return {
                    ...state,
                    inventoryActivityAmount: action.payload.inventoryReducer.inventoryActivityAmount,
                    inventoryActivity: action.payload.inventoryReducer.inventoryActivity,
                    inventoryActivitySelected:action.payload.inventoryReducer.inventoryActivitySelected,
                };

            } else {
                return {
                    ...state
                }
            }

        }
        case USER.LOG_OUT: {
            return {
                inventoryActivityAmount: 0,
                inventoryActivity: []
            }
        }
        default:
            return {
                ...state
            };
    }
}