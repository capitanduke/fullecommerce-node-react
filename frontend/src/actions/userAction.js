import { USER_SIGTNIN_REQUEST, USER_SIGTNIN_SUCCESS, USER_SIGTNIN_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/userConstants';
import Cookie from "js-cookie";
import Axios from 'axios';

const users = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({type: USER_LIST_REQUEST});
  try{
    const { data } = await Axios.get("/api/users/" ,
     {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch(error){
    dispatch({type: USER_LIST_FAIL, payload: error.message});
  }
  
}

const details = (userId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({type: USER_DETAILS_REQUEST});
  try{
    const { data } = await Axios.get("/api/users/profileid/" + userId,
     {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch(error){
    dispatch({type: USER_DETAILS_FAIL, payload: error.message});
  }
  
}

const signIn = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGTNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGTNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGTNIN_FAIL, payload: error.message});
    }
}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    //Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/api/users/register", { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }

  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type : USER_LOGOUT})
  }

export { signIn, register, logout, update, users, details };