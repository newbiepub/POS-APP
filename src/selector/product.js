import { createSelector } from 'reselect';

export const productData = createSelector([(state) => state], (state) => {
    return {
        productInventory: state.inventory.products,
    };
});

export const productInput = createSelector([state => state], state => {
    let { data, ...restProps } = state.listProduct;
    return restProps;
})