/*
 *
 * Tricks reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_TRICKS_SUCCESS,
  TRICK_NAME_CHANGE,
  SEARCH_NAME_CHANGE,
  SEARCH_NAME_SUCCESS,
  USER_ID_CHANGE,
  CHALLENGE_ID_CHANGE,
} from './constants';

export const initialState = {
  tricks: [],
  tricksName: '',
  challengeIdToAdd: '',
  userIdToAdd: '',
  searchTrickName: '',
};

/* eslint-disable default-case, no-param-reassign */
const tricksReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_TRICKS_SUCCESS:
        draft.tricks = action.tricks;
        break;
      case TRICK_NAME_CHANGE:
        draft.tricksName = action.trickNameIncoming;
        break;
      case USER_ID_CHANGE:
        draft.userIdToAdd = action.userIdIncoming;
        break;
      case CHALLENGE_ID_CHANGE:
        draft.challengeIdToAdd = action.challengeIdIncoming;
        break;
      case SEARCH_NAME_CHANGE:
        draft.searchTrickName = action.searchNameIncoming;
        break;
      case SEARCH_NAME_SUCCESS:
        draft.tricks = action.result;
        break;
    }
  });

export default tricksReducer;
