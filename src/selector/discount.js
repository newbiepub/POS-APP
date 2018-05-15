import { createSelector } from 'reselect';

export const discounts = createSelector([(state) => state], (state) => state.discount.data || []);

export const inputData = createSelector([(state) => state], (state) => {
    let { data, ...restProps } = state.discount;
    return restProps;
});