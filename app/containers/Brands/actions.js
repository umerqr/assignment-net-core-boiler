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
// this should call to saga
export const fetchBrands = () => ({
  type: FETCH_BRANDS,
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
