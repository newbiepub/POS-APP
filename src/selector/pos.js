import { createSelector } from 'reselect';

export const allPOS = createSelector([(state) => state], (state) => state.pos.all || [])