import {CART_ACTION} from '../../constant/constant';

const initialState = {
    product:[],
    category:[],
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        default:
            return {
                ...state
            };
    }
}