import {POPUP_ACTION} from "../../../constant/popup";

const initialState = {
    isVisible: false,
    children: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case POPUP_ACTION.OPEN: {
            return {
                ...state,
                isVisible: true
            }
        }
        case POPUP_ACTION.CLOSE: {
            return {
                ...state,
                isVisible: false
            }
        }
        case POPUP_ACTION.RENDER_CONTENT: {
            return {
                ...state,
                children: action.payload
            }
        }
        default: return state;
    }
}