import { PRODUCT_UPLOAD_REQUEST, PRODUCT_UPLOAD_SUCCESS, PRODUCT_UPLOAD_FAIL } from '../constants/uploadConstants';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';

function uploadProductReducer(state = { product: {} }, action) {
    switch (action.type) {
      case PRODUCT_UPLOAD_REQUEST:
        return { loading: true };
      case PRODUCT_UPLOAD_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function productsReducer(state = { products: [] }, action) {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

export { uploadProductReducer, productsReducer };