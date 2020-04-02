/*
 *
 * Users actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  ADD_USERS,
  ADD_USERS_SUCCESS,
  ADD_USERS_ERROR,
  USER_NAME_CHANGE,
  SEARCH_NAME_CHANGE,
  SEARCH_NAME,
  SEARCH_NAME_SUCCESS,
  SEARCH_NAME_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
// Fetch actions below
// this should call to saga
export const fetchUsers = pageNo => ({
  type: FETCH_USERS,
  pageNo,
});

// after saga this should fetch the data
export const usersFetched = (users, pages) => ({
  type: FETCH_USERS_SUCCESS,
  users,
  pages,
});
// If error occurs, its is handled by this
export function fetchUserError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
}

// Add Users actions below
export const addUsers = () => ({
  type: ADD_USERS,
});

export const usersAdded = () => ({
  type: ADD_USERS_SUCCESS,
});

export const usersAddError = () => ({
  type: ADD_USERS_ERROR,
});

// Search Users Actions below

export const searchUsers = () => ({
  type: SEARCH_NAME,
});

export const searchUsersSuccess = result => ({
  type: SEARCH_NAME_SUCCESS,
  result,
});

export const searchUsersError = () => ({
  type: SEARCH_NAME_ERROR,
});
// onChange User Name action below
export const changeUserName = userNameIncoming => ({
  type: USER_NAME_CHANGE,
  userNameIncoming,
});

// onChange Search Name action below
export const changeSearchName = searchNameIncoming => ({
  type: SEARCH_NAME_CHANGE,
  searchNameIncoming,
});
