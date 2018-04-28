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
                all: [...state.all]
            }
        }
        default: return state;
    }
}