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
} from './constants';

export const initialState = {
  page: 1,
  brands: [],
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
    }
  });

export default brandsReducer;
