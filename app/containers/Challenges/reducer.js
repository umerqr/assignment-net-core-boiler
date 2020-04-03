/*
 *
 * Challenges reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_BRANDS_SUCCESS,
  FETCH_CHALLENGES_SUCCESS,
  SELECT_CHANGE,
  CHALLENGE_NAME_CHANGE,
} from './constants';
import { BRAND_NAME_CHANGE } from '../Brands/constants';

export const initialState = {
  brands: [],
  challenges: [],
  idToSearch: '',
  challengeNameToAdd: '',
  brandIdToAdd: '',
};

/* eslint-disable default-case, no-param-reassign */
const challengesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_BRANDS_SUCCESS:
        draft.brands = action.brands;
        draft.idToSearch = action.brands[0].id;
        break;
      case FETCH_CHALLENGES_SUCCESS:
        draft.challenges = action.challenges;
        break;
      case SELECT_CHANGE:
        draft.idToSearch = action.searchIdIncoming;
        break;
      case CHALLENGE_NAME_CHANGE:
        draft.challengeNameToAdd = action.challengeNameIncoming;
        break;
      case BRAND_NAME_CHANGE:
        draft.brandIdToAdd = action.brandIdIncoming;
        break;
    }
  });

export default challengesReducer;
