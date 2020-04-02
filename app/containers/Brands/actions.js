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
  ADD_BRANDS,
  ADD_BRANDS_SUCCESS,
  ADD_BRANDS_ERROR,
  BRAND_NAME_CHANGE,
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
// If error occurs, its is handled by this
export function fetchBrandError(error) {
  return {
    type: FETCH_BRANDS_ERROR,
    error,
  };
}

// Add Brands actions below
export const addBrands = () => ({
  type: ADD_BRANDS,
});

export const brandsAdded = () => ({
  type: ADD_BRANDS_SUCCESS,
});

export const brandsAddError = () => ({
  type: ADD_BRANDS_ERROR,
});

// Search Brands Actions below

export const searchBrands = () => ({
  type: SEARCH_NAME,
});

export const searchBrandsSuccess = result => ({
  type: SEARCH_NAME_SUCCESS,
  result,
});

export const searchBrandsError = () => ({
  type: SEARCH_NAME_ERROR,
});
// onChange Brand Name action below
export const changeBrandName = brandNameIncoming => ({
  type: BRAND_NAME_CHANGE,
  brandNameIncoming,
});

// onChange Search Name action below
export const changeSearchName = searchNameIncoming => ({
  type: SEARCH_NAME_CHANGE,
  searchNameIncoming,
});
