import { USER_SIGTNIN_REQUEST, USER_SIGTNIN_SUCCESS, USER_SIGTNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';

function userSigninReducer(state={}, action){
    
    switch (action.type) {
        case USER_SIGTNIN_REQUEST:
            return {loading: true};
        case USER_SIGTNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGTNIN_FAIL:
            return { loading: false, error: action.payload};
        default: 
            return state;
    }
}


function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

export { userSigninReducer, userRegisterReducer };