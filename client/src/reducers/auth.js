import config from '../config/config'
import storage from '../lib/storage';
import Immutable from 'immutable';

import { replace } from 'react-router-redux';

/** ********************************************
 ** Constants                                **
 ******************************************** */

const AUTH_USER = Symbol();
const UNAUTH_USER = Symbol();
const AUTH_ERROR = Symbol();

const initState = () => {
  const token = storage.get('token');
  return Immutable.fromJS({
    error: null,
    timestamp: null,
    authenticated: !!token,
    isAdmin: !!token && tokenIsAdmin(token),
  });
};

/** ********************************************
 ** Helper Functions                         **
 ******************************************** */

const tokenGetClaims = (token) => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

const tokenIsAdmin = token => !!tokenGetClaims(token).admin;

/** ********************************************
 ** Auth States                              **
 ******************************************** */

class State {
  static Auth(error, token) {
    return {
      type: error ? AUTH_ERROR : AUTH_USER,
      isAdmin: error ? undefined : tokenIsAdmin(token),
      error: error || undefined,
    };
  }

  static UnAuth(error) {
    return {
      type: UNAUTH_USER,
    };
  }
}

/** ********************************************
 ** Actions                                  **
 ******************************************** */

const LoginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(config.apiRoutes.API_URL + config.apiRoutes.auth.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const status = await response.status;
    const data = await response.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    storage.set('token', data.token);
    dispatch(State.Auth(null, data.token));
  } catch (err) {
    dispatch(State.Auth(err.message));
  }
};

const LogoutUser = error => async (dispatch) => {
  console.log('here')
  dispatch(State.UnAuth());
  storage.remove('token');
  storage.remove('auth');
  dispatch(replace('/login'));
};

/** ********************************************
 ** Auth Reducer                             **
 ******************************************** */

const Auth = (state = initState(), action) => {
  switch (action.type) {
    case AUTH_USER:
      return state.withMutations((val) => {
        val.set('error', null);
        val.set('timestamp', Date.now());
        val.set('authenticated', true);
        val.set('isAdmin', action.isAdmin);
      });

    case UNAUTH_USER:
      return state.withMutations((val) => {
        val.set('authenticated', false);
        val.set('isAdmin', false);
      });

    case AUTH_ERROR:
      return state.withMutations((val) => {
        val.set('error', action.error);
        val.set('timestamp', Date.now());
      });

    default:
      return state;
  }
};

export {
  Auth, LoginUser, LogoutUser
};
