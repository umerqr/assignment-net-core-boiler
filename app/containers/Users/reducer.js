/*
 *
 * Users reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_USERS_SUCCESS,
  USER_NAME_CHANGE,
  SEARCH_NAME_CHANGE,
  SEARCH_NAME_SUCCESS,
} from './constants';

export const initialState = {
  users: [],
  userName: '',
  searchUserName: '',
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_USERS_SUCCESS:
        draft.users = action.users;
        break;
      case USER_NAME_CHANGE:
        draft.userName = action.userNameIncoming;
        break;
      case SEARCH_NAME_CHANGE:
        draft.searchUserName = action.searchNameIncoming;
        break;
      case SEARCH_NAME_SUCCESS:
        draft.users = action.result;
        break;
    }
  });

export default usersReducer;
