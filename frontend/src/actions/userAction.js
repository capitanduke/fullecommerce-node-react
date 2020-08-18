import { USER_SIGTNIN_REQUEST, USER_SIGTNIN_SUCCESS, USER_SIGTNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import Cookie from "js-cookie";
import Axios from 'axios';


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

export { signIn, register };