import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_EMPTY } from '../constants/orderConstants';

function OrderCreateReducer(state = {}, action){
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_EMPTY:
          return {};
        default:
            return state;
    }
}


function OrderDetailsReducer(state = {order: { orderItems: [], shipping: {}, payment: {} }}, action){
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function myOrderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
        return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function OrderListReducer(state = {
      orders: []
    }, action) {
      switch (action.type) {
        case ORDER_LIST_REQUEST:
          return { loading: true, orders: [] };
        case ORDER_LIST_SUCCESS:
          return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
      }
    }

  function OrderDeleteReducer(state = {}, action){
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
  }

export { OrderCreateReducer, OrderDetailsReducer, myOrderListReducer, OrderListReducer, OrderDeleteReducer }