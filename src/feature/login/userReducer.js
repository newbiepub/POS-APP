import {USER} from '../../constant/constant';
import { REHYDRATE } from 'redux-persist';
const initialState = {
    token: {},
    profile: {},
    _id: ""
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case USER.GET_PROFILE_USER: {
            return {
                ...state,
                _id: action.payload._id,
                profile:action.payload.profile
            }
        }
        case REHYDRATE:
        {
            console.warn(action.payload.userReducer);

            return {
                ...state,
                token: action.payload.userReducer.token,
                profile: action.payload.userReducer.profile,
                _id: action.payload.userReducer._id,
            };
        }


        default:
            return {
                ...state
            };
    }
}