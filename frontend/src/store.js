import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { productListReducer, productSaveReducer, productDetailsReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import { OrderCreateReducer, OrderDetailsReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    cart: { cartItems, shipping: {}, payment: {} },
    userSignin: { userInfo },
  };


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    shipping: cartReducer,
    payment: cartReducer,
    orderCreate: OrderCreateReducer,
    orderDetails: OrderDetailsReducer
})


const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));


export default store;