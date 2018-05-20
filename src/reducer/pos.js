import {POS_ACTION} from "../constant/actionTypes";

const initialState = {
    all: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case POS_ACTION.FETCH_ALL: {
            return {
                ...state,
                all: action.payload
            }
        }
        case POS_ACTION.ADD_OPTIMISTIC: {
            return {
                ...state,
                all: [...state.all, action.payload]
            }
        }
        case POS_ACTION.ADD: {
            let pos          = state.all;
            let payload      = action.payload || {}
            let optimisticId = payload._id
            let index        = pos.findIndex(item => item._id === optimisticId);

            pos[index]       = payload.data
            return {
                ...state,
                all: [...pos]
            }
        }
        case POS_ACTION.UPDATE: {
            let pos = state.all;
            let {
                username = '',
                name = '',
                address = '',
                phoneNumber = ''
            } = action.payload;
            let employeeId = action.payload.employeeId;
            let posIndex = pos.findIndex(item => item._id === employeeId);

            pos[posIndex] = {
                ...pos[posIndex],
                username,
                profile: {
                    name,
                    address,
                    phoneNumber
                }
            }
            return {
                ...state,
                all: [...pos]
            }
        }
        case POS_ACTION.DEACTIVATE: {
            let pos = state.all;
            let employeeId = action.payload.employeeId;
            let posIndex = pos.findIndex(item => item._id === employeeId);

            pos[posIndex] = {
                ...pos[posIndex],
                status: action.payload.status
            }
            return {
                ...state,
                all: [...pos]
            }
        }
        default: return state;
    }
}