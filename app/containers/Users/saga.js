import { takeLatest, call, put, all, select } from 'redux-saga/effects';
// import axios from 'axios';
import {
  usersFetched,
  fetchUserError,
  usersAdded,
  usersAddError,
  searchUsersSuccess,
  searchUsersError,
} from './actions';
// import { makeSelectPage } from './selectors';
import { FETCH_USERS, ADD_USERS, SEARCH_NAME } from './constants';
import { makeUserName, makeSearchName } from './selectors';
import getRequest from './getRequest';
import postRequest from './postRequest';

// Individual exports for testing

export function* fetchUsersList(actions) {
  const pages = `?page=${actions.pageNo}`;
  const requestURL = `https://localhost:44306/api/Users/${pages}`;
  try {
    const users = yield call(getRequest, requestURL);
    yield put(usersFetched(users));
  } catch (err) {
    yield put(fetchUserError(err));
  }
}

export function* addUsersToList() {
  const usersName = yield select(makeUserName());
  const data = {
    name: usersName,
  };
  const postRequestURL = `https://localhost:44306/api/Users`;
  try {
    const addUsers = yield call(postRequest, postRequestURL, data);
    yield put(usersAdded(addUsers));
  } catch (err) {
    yield put(usersAddError(err));
  }
}
export function* serverSearch() {
  const serverSearchName = yield select(makeSearchName());
  // const data = {
  //   name: serverSearchName,
  // };

  const searchRequestURL = `https://localhost:44306/api/Users/${serverSearchName}`;
  try {
    const searchUserResult = yield call(getRequest, searchRequestURL);
    yield put(searchUsersSuccess(searchUserResult));
  } catch (err) {
    yield put(searchUsersError(err));
  }
}

export function* sagaFetchUsers() {
  yield takeLatest(FETCH_USERS, fetchUsersList);
}
export function* sagaAddUsers() {
  yield takeLatest(ADD_USERS, addUsersToList);
}
export function* sagaOnSearch() {
  yield takeLatest(SEARCH_NAME, serverSearch);
}
export default function* usersSaga() {
  yield all([sagaFetchUsers(), sagaAddUsers(), sagaOnSearch()]);
}
