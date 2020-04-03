import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
  brandsFetched,
  fetchBrandError,
  challengesFetched,
  fetchChallengesError,
  ChallengesAdded,
  challengeAddError,
} from './actions';
import { FETCH_BRANDS, FETCH_CHALLENGES, ADD_CHALLENGES } from './constants';
import getRequest from './getRequest';
import {
  makeSelectIdToSearch,
  makeSelectChallengeNameToAdd,
  makeSelectBrandIdToAdd,
} from './selectors';
import postRequest from './postRequest';

export function* addChallengesToServer() {
  const challengeName = yield select(makeSelectChallengeNameToAdd());
  const brandIdIncoming = yield select(makeSelectBrandIdToAdd());
  const convertedId = parseInt(brandIdIncoming, 10);
  const data = {
    name: challengeName,
    brandId: convertedId,
  };
  // console.log('it ran')
  const postRequestURL = `https://localhost:44306/api/Challenges`;
  try {
    const addChallenges = yield call(postRequest, postRequestURL, data);
    yield put(ChallengesAdded(addChallenges));
  } catch (err) {
    yield put(challengeAddError(err));
  }
}
// Individual exports for testing
export function* fetchBrandsList() {
  const requestURL = `https://localhost:44306/api/Brands/`;
  try {
    const brands = yield call(getRequest, requestURL);
    yield put(brandsFetched(brands));
  } catch (err) {
    yield put(fetchBrandError(err));
  }
}
export function* fetchChallengesList() {
  const id = yield select(makeSelectIdToSearch());
  const requestURL = `https://localhost:44306/api/Challenges/${id}`;
  try {
    const brands = yield call(getRequest, requestURL);
    yield put(challengesFetched(brands));
  } catch (err) {
    yield put(fetchChallengesError(err));
  }
}

export function* sagaFetchBrands() {
  yield takeLatest(FETCH_BRANDS, fetchBrandsList);
}
export function* sagaFetchChallenges() {
  yield takeLatest(FETCH_CHALLENGES, fetchChallengesList);
}
export function* sagaAddChallenges() {
  yield takeLatest(ADD_CHALLENGES, addChallengesToServer);
}
export default function* challengesSaga() {
  yield all([sagaFetchBrands(), sagaFetchChallenges(), sagaAddChallenges()]);
}
