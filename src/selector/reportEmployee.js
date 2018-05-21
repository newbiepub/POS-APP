import { createSelector } from 'reselect';

export const reports = createSelector([(state) => state], (state) => {
    return state.reportEmployee
});