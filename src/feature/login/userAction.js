import {USER} from "../../constant/constant";

import {QUERY} from '../../constant/query';

import {client} from '../../root';

function getUserProfileAction(payload) {
    return {
        type: USER.GET_PROFILE_USER,
        payload
    }
}

export function getProfile() {
    return async (dispatch, getState) => {
        try {
            const products = await client.query({
                query: QUERY.CURRENT_USER
            });
            dispatch(getUserProfileAction(products.data.currentUser))

        } catch (e) {
            console.warn(e);
        }
    }
}