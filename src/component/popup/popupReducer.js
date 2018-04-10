import {POPUP_ACTION} from '../../constant/constant';

const initialState = {
    isVisible: false,
    children: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case POPUP_ACTION.OPEN_POPUP: {
            // console.warn(action.payload)
            return {
                ...state,
                isVisible: true,
                children: action.payload
            }
        }
        case POPUP_ACTION.CLOSE_POPUP: {
            return {
                ...state,
                isVisible: false,
                children: null
            }
        }
        default:
            return {
                ...state,
                children: null
            };
    }
}