/*
 *
 * Brands reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  // FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  BRAND_NAME_CHANGE,
  SEARCH_NAME_CHANGE,
  SEARCH_NAME_SUCCESS,
} from './constants';

export const initialState = {
  brands: [],
  brandsName: '',
  searchBrandName: '',
};

/* eslint-disable default-case, no-param-reassign */
const brandsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_BRANDS_SUCCESS:
        draft.brands = action.brands;
        break;
      case BRAND_NAME_CHANGE:
        draft.brandsName = action.brandNameIncoming;
        break;
      case SEARCH_NAME_CHANGE:
        draft.searchBrandName = action.searchNameIncoming;
        break;
      case SEARCH_NAME_SUCCESS:
        draft.brands = action.result;
        break;
    }
  });

export default brandsReducer;
