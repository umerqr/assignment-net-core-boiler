import { takeLatest, call, put } from 'redux-saga/effects';
// import axios from 'axios';
import request from '../../utils/request';
import { brandsFetched, fetchBrandError } from './actions';
// import { makeSelectPage } from './selectors';
import { FETCH_BRANDS } from './constants';

// Individual exports for testing

export function* fetchBrandsList(actions) {
  // To do call api
  // to do set result in action
  const pages = `?page=${actions.pageNo}`;
  // console.log(actions.pageNo, 'actions in fetchbrand');
  const requestURL = `https://localhost:44306/api/Brands/${pages}`;
  try {
    // Call our request helper (see 'utils/request')
    const brands = yield call(request, requestURL);
    // let brand;
    // axios.get(requestURL).then(response => {
    //   brand = response.data;
    // });
    yield put(brandsFetched(brands));
  } catch (err) {
    yield put(fetchBrandError(err));
  }
}

// export function* sagaFetchBrands() {
//   yield takeLatest(FETCH_BRANDS, fetchBrandsList());
// }
export default function* brandsSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(FETCH_BRANDS, fetchBrandsList);
}
