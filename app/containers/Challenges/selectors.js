import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the challenges state domain
 */

const selectChallengesDomain = state => state.challenges || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Challenges
 */

const makeSelectChallenges = () =>
  createSelector(
    selectChallengesDomain,
    substate => substate.challenges,
  );
const makeSelectFetchBrands = () =>
  createSelector(
    selectChallengesDomain,
    substate => substate.brands,
  );
const makeSelectIdToSearch = () =>
  createSelector(
    selectChallengesDomain,
    substate => substate.idToSearch,
  );
const makeSelectChallengeNameToAdd = () =>
  createSelector(
    selectChallengesDomain,
    substate => substate.challengeNameToAdd,
  );
const makeSelectBrandIdToAdd = () =>
  createSelector(
    selectChallengesDomain,
    substate => substate.brandIdToAdd,
  );

export default makeSelectChallenges;
export {
  selectChallengesDomain,
  makeSelectFetchBrands,
  makeSelectIdToSearch,
  makeSelectChallenges,
  makeSelectChallengeNameToAdd,
  makeSelectBrandIdToAdd,
};
