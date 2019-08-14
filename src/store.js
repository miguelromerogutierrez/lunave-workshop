import { createStore } from 'redux';

const initialStateUser = {
  user: null
}

const userReducer = (state = initialStateUser, actions) => {
  switch(actions.type) {
    case 'LOGIN_USER':
    case 'UPDATE_USER':
      return { user: actions.user };
    case 'LOGOUT_USER':
      return { user: null };
    default:
      return state;
  }
}

export const store = createStore(userReducer);
