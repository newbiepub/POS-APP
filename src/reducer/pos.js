import {POS_MANAGEMENT} from "../feature/pos/action/posAction";

const initialState = {
    all: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case POS_MANAGEMENT.FETCH_ALL_POS: {
            return {
                ...state,
                all: action.payload
            }
        }
        default: return state;
    }
}