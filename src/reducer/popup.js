import {POPUP} from "../constant/constant";

const initialState = {
    visible: false,
    renderModal: () => {}
};

export default popupReducer(initialState);

function popupReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case POPUP.OPEN_POPUP: {
                return {
                    ...state,
                    visible: action.payload
                }
            }
            case POPUP.CLOSE_POPUP: {
                return {
                    ...state,
                    visible: action.payload
                }
            }
            case POPUP.RENDER_POPUP: {
                return {
                    ...state,
                    renderModal: action.payload
                }
            }
            default:
                return {
                    ...state,
                    initialState
                }
        }
    }
}