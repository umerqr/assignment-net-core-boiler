/*
 *
 * Brands actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
// Fetch actions below
// this should call to saga
export const fetchBrands = pageNo => ({
  type: FETCH_BRANDS,
  pageNo,
});

// after saga this should fetch the data
export const brandsFetched = (brands, pages) => ({
  type: FETCH_BRANDS_SUCCESS,
  brands,
  pages,
});

export function fetchBrandError(error) {
  return {
    type: FETCH_BRANDS_ERROR,
    error,
  };
}
// Page Change actions below
