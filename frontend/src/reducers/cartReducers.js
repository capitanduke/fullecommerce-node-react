import { CART_ADD_ITEM_FAIL, CART_ADD_ITEM, CART_ADD_ITEM_REQUEST, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {

    switch (action.type) {
      
      case CART_ADD_ITEM:
        const item = action.payload;
        const product = state.cartItems.find(x => x.product === item.product);
        if (product) {
          return {
            cartItems:
              state.cartItems.map(x => x.product === product.product ? item : x)
          };
        }
        return { cartItems: [...state.cartItems, item] };


      case CART_ADD_ITEM_FAIL:
        return { loading: false, error: action.payload }

      case CART_REMOVE_ITEM:
        return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };

      case CART_SAVE_SHIPPING:
        const shippingData = action.payload;
        return { ...state, shipping: shippingData }

      case CART_SAVE_PAYMENT:
        const paymentData = action.payload;
        return { ...state, payment: paymentData }

      default:
        return state;
    }
  }

  

export { cartReducer }