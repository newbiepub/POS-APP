import { createSelector } from 'reselect';

export const orders = createSelector([(state) => state], (state) => {
    return {
        orders: state.inventory.activityRequest
    };
});