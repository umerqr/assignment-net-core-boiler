/*
 *
 * Tricks actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_TRICKS,
  FETCH_TRICKS_SUCCESS,
  FETCH_TRICKS_ERROR,
  ADD_TRICKS,
  ADD_TRICKS_SUCCESS,
  ADD_TRICKS_ERROR,
  SEARCH_NAME_ERROR,
  TRICK_NAME_CHANGE,
  SEARCH_NAME_CHANGE,
  SEARCH_NAME,
  SEARCH_NAME_SUCCESS,
  USER_ID_CHANGE,
  CHALLENGE_ID_CHANGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
// Fetch actions below
// this should call to saga
export const fetchTricks = pageNo => ({
  type: FETCH_TRICKS,
  pageNo,
});

// after saga this should fetch the data
export const tricksFetched = (tricks, pages) => ({
  type: FETCH_TRICKS_SUCCESS,
  tricks,
  pages,
});
// If error occurs, its is handled by this
export function fetchTrickError(error) {
  return {
    type: FETCH_TRICKS_ERROR,
    error,
  };
}

// Add Tricks actions below
export const addTricks = () => ({
  type: ADD_TRICKS,
});

export const tricksAdded = () => ({
  type: ADD_TRICKS_SUCCESS,
});

export const tricksAddError = () => ({
  type: ADD_TRICKS_ERROR,
});

// Search Tricks Actions below

export const searchTricks = () => ({
  type: SEARCH_NAME,
});

export const searchTricksSuccess = result => ({
  type: SEARCH_NAME_SUCCESS,
  result,
});

export const searchTricksError = () => ({
  type: SEARCH_NAME_ERROR,
});
// onChange Trick Name action below
export const changeTrickName = trickNameIncoming => ({
  type: TRICK_NAME_CHANGE,
  trickNameIncoming,
});
export const changeUserIdToAdd = userIdIncoming => ({
  type: USER_ID_CHANGE,
  userIdIncoming,
});
export const changeChallengeIdToAdd = challengeIdIncoming => ({
  type: CHALLENGE_ID_CHANGE,
  challengeIdIncoming,
});

// onChange Search Name action below
export const changeSearchName = searchNameIncoming => ({
  type: SEARCH_NAME_CHANGE,
  searchNameIncoming,
});
