import { takeLatest, call, put, all, select } from 'redux-saga/effects';
// import axios from 'axios';
import {
  brandsFetched,
  fetchBrandError,
  brandsAdded,
  brandsAddError,
  searchBrandsSuccess,
  searchBrandsError,
} from './actions';
// import { makeSelectPage } from './selectors';
import { FETCH_BRANDS, ADD_BRANDS, SEARCH_NAME } from './constants';
import { makeBrandName, makeSearchName } from './selectors';
import getRequest from './getRequest';
import postRequest from './postRequest';

// Individual exports for testing

export function* fetchBrandsList(actions) {
  const pages = `?page=${actions.pageNo}`;
  const requestURL = `https://localhost:44306/api/Brands/${pages}`;
  try {
    const brands = yield call(getRequest, requestURL);
    yield put(brandsFetched(brands));
  } catch (err) {
    yield put(fetchBrandError(err));
  }
}

export function* addBrandsToList() {
  const brandsName = yield select(makeBrandName());
  const data = {
    name: brandsName,
  };
  const postRequestURL = `https://localhost:44306/api/Brands`;
  try {
    const addBrands = yield call(postRequest, postRequestURL, data);
    yield put(brandsAdded(addBrands));
  } catch (err) {
    yield put(brandsAddError(err));
  }
}
export function* serverSearch() {
  const serverSearchName = yield select(makeSearchName());
  // const data = {
  //   name: serverSearchName,
  // };
  const searchRequestURL = `https://localhost:44306/api/Brands/${serverSearchName}`;
  try {
    const searchBrandResult = yield call(getRequest, searchRequestURL);
    yield put(searchBrandsSuccess(searchBrandResult));
  } catch (err) {
    yield put(searchBrandsError(err));
  }
}

export function* sagaFetchBrands() {
  yield takeLatest(FETCH_BRANDS, fetchBrandsList);
}
export function* sagaAddBrands() {
  yield takeLatest(ADD_BRANDS, addBrandsToList);
}
export function* sagaOnSearch() {
  yield takeLatest(SEARCH_NAME, serverSearch);
}
export default function* brandsSaga() {
  yield all([sagaFetchBrands(), sagaAddBrands(), sagaOnSearch()]);
}
