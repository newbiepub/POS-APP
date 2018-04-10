import {USER} from '../../constant/constant';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    token: {},
    profile: {},
    _id: "",
    currency: {}
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case USER.GET_PROFILE_USER: {
            return {
                ...state,
                _id: action.payload._id,
                profile: action.payload.profile
            }
        }
        case USER.GET_CURRENCY:{
            return {
                ...state,
                currency: action.payload
            }
        }
        case REHYDRATE: {
            if (action.payload && action.payload.userReducer) {
                return {
                    ...state,
                    token: action.payload.userReducer.token,
                    profile: action.payload.userReducer.profile,
                    _id: action.payload.userReducer._id,
                };

            }else{
                return{
                    ...state
                }
            }

        }


        default:
            return {
                ...state
            };
    }
}