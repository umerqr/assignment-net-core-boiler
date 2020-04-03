import { takeLatest, call, put, all, select } from 'redux-saga/effects';
// import axios from 'axios';
import {
  tricksFetched,
  fetchTrickError,
  tricksAdded,
  tricksAddError,
  searchTricksSuccess,
  searchTricksError,
} from './actions';
// import { makeSelectPage } from './selectors';
import { FETCH_TRICKS, ADD_TRICKS, SEARCH_NAME } from './constants';
import {
  makeTrickName,
  makeSearchName,
  makeChallengeId,
  makeUserId,
} from './selectors';
import getRequest from './getRequest';
import postRequest from './postRequest';

// Individual exports for testing

export function* fetchTricksList(actions) {
  const pages = `?page=${actions.pageNo}`;
  const requestURL = `https://localhost:44306/api/Tricks/${pages}`;
  try {
    const tricks = yield call(getRequest, requestURL);
    yield put(tricksFetched(tricks));
  } catch (err) {
    yield put(fetchTrickError(err));
  }
}

export function* addTricksToList() {
  const tricksName = yield select(makeTrickName());
  const challengeIdToAdd = yield select(makeChallengeId());
  const userIdToAdd = yield select(makeUserId());
  const convertUserId = parseInt(userIdToAdd, 10);
  const convertChallengeId = parseInt(challengeIdToAdd, 10);
  const data = {
    content: tricksName,
    userId: convertUserId,
    challengeId: convertChallengeId,
  };
  const postRequestURL = `https://localhost:44306/api/Tricks`;
  try {
    const addTricks = yield call(postRequest, postRequestURL, data);
    yield put(tricksAdded(addTricks));
  } catch (err) {
    yield put(tricksAddError(err));
  }
}
export function* serverSearch() {
  const serverSearchName = yield select(makeSearchName());
  // const data = {
  //   name: serverSearchName,
  // };
  const searchRequestURL = `https://localhost:44306/api/Tricks/${serverSearchName}`;
  try {
    const searchTrickResult = yield call(getRequest, searchRequestURL);
    yield put(searchTricksSuccess(searchTrickResult));
  } catch (err) {
    yield put(searchTricksError(err));
  }
}

export function* sagaFetchTricks() {
  yield takeLatest(FETCH_TRICKS, fetchTricksList);
}
export function* sagaAddTricks() {
  yield takeLatest(ADD_TRICKS, addTricksToList);
}
export function* sagaOnSearch() {
  yield takeLatest(SEARCH_NAME, serverSearch);
}
export default function* tricksSaga() {
  yield all([sagaFetchTricks(), sagaAddTricks(), sagaOnSearch()]);
}
