/*
 *
 * Challenges actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
  FETCH_CHALLENGES,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  SELECT_CHANGE,
  ADD_CHALLENGES,
  ADD_CHALLENGES_SUCCESS,
  ADD_CHALLENGES_ERROR,
  CHALLENGE_NAME_CHANGE,
} from './constants';
import { BRAND_NAME_CHANGE } from '../Brands/constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
// Fetch Brands below
export const fetchBrands = () => ({
  type: FETCH_BRANDS,
});

// after saga this should fetch the data
export const brandsFetched = brands => ({
  type: FETCH_BRANDS_SUCCESS,
  brands,
});
// If error occurs, its is handled by this
export function fetchBrandError(error) {
  return {
    type: FETCH_BRANDS_ERROR,
    error,
  };
}
// Fetch Challenges below
export const fetchChallenges = () => ({
  type: FETCH_CHALLENGES,
});

// after saga this should fetch the data
export const challengesFetched = challenges => ({
  type: FETCH_CHALLENGES_SUCCESS,
  challenges,
});
// If error occurs, its is handled by this
export function fetchChallengesError(error) {
  return {
    type: FETCH_CHALLENGES_ERROR,
    error,
  };
}
export const addChallenges = () => ({
  type: ADD_CHALLENGES,
});

export const ChallengesAdded = () => ({
  type: ADD_CHALLENGES_SUCCESS,
});

export const challengeAddError = () => ({
  type: ADD_CHALLENGES_ERROR,
});

// onChange Select
export const changeSelectName = searchIdIncoming => ({
  type: SELECT_CHANGE,
  searchIdIncoming,
});
// onChange Challenge Name
export const changeChallengeName = challengeNameIncoming => ({
  type: CHALLENGE_NAME_CHANGE,
  challengeNameIncoming,
});
// onChange Brand Name
export const changeBrandId = brandIdIncoming => ({
  type: BRAND_NAME_CHANGE,
  brandIdIncoming,
});
