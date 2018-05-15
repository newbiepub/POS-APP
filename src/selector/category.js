import { createSelector } from 'reselect';

export const categoryData = createSelector([(state) => state], (state) => {
    return {
        name: state.category.name,
        products: state.category.products
    };
});