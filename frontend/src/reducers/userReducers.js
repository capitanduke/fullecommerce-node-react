import { USER_SIGTNIN_REQUEST, USER_SIGTNIN_SUCCESS, USER_SIGTNIN_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/userConstants';

function userSigninReducer(state={}, action){
    switch (action.type) {
        case USER_SIGTNIN_REQUEST:
            return {loading: true};
        case USER_SIGTNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGTNIN_FAIL:
            return { loading: false, error: action.payload};
        case USER_LOGOUT:
            return { }
        default: 
            return state;
    }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userUpdate: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
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

function usersListReducer(state = { usersList: []}, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, usersList: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, usersList: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userDetailsReducer(state = {}, action) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { userSigninReducer, userRegisterReducer, userUpdateReducer, usersListReducer, userDetailsReducer };