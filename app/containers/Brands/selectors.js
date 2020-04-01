import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the brands state domain
 */

const selectBrandsDomain = state => state.brands || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Brands
 */

const makeSelectBrands = () =>
  createSelector(
    selectBrandsDomain,
    substate => substate.brands,
  );
// const makeSelectPage = () =>
//   createSelector(
//     selectBrandsDomain,
//     substate => substate.page,
//   );

export default makeSelectBrands;
export { selectBrandsDomain, makeSelectBrands };
